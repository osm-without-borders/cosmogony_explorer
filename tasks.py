from invoke import task
import os
import logging

logging.basicConfig(level=logging.INFO)


@task()
def run_local(ctx, cosmogony_file_name="cosmogony.json", build_dockers=False):
    pop_stack(ctx, build_dockers)
    run_explorer(ctx, cosmogony_file_name, restart_tiles=True)
    open_browser(ctx)

@task()
def open_browser(ctx):
    explorer_port = ctx.run("""
        docker inspect -f '{{(index .NetworkSettings.Ports "80/tcp" 0).HostPort}}' $(docker-compose ps -q explorer)
    """)
    port = explorer_port.stdout.split('\n')[0]
    ctx.run(f"sensible-browser 'http://localhost:{port}/#/2.5/32/0'")


@task()
def pop_stack(ctx, build_dockers=False):
    if build_dockers:
        ctx.run("docker-compose build --pull", env={"COMPOSE_FILE": 'docker-compose.build.yml'})
    ctx.run("docker-compose up -d")


def _run_container(ctx, container_name, job):
    main_docker_files = _get_docker_compose()
    run_docker_files = {"COMPOSE_FILE": main_docker_files + ":docker-compose.run.yml"}
    ctx.run(f"docker-compose run --rm {container_name} {job}", env=run_docker_files)


@task(default=True)
def run_explorer(ctx, cosmogony_file_name="cosmogony.json", restart_tiles=False):

    path_in_container = f"/mnt/data/{cosmogony_file_name}"
    _run_container(ctx, "importer", f"./import.py import_data {path_in_container}")

    ctx.run(
        "docker-compose exec tiles /usr/bin/t_rex generate -c /config_generate.toml --minzoom 0 --maxzoom 6 --overwrite true --progress true",
        pty=True,
    )

    _run_container(ctx, "importer", f"./import.py publish")
    ctx.run("docker-compose exec tiles /publish_tiles.sh", pty=True)

    if restart_tiles:
        ctx.run("docker-compose restart tiles", pty=True)

    generate_data_dashboard(ctx, cosmogony_file_name)


def _get_docker_compose():
    return os.environ.get("COMPOSE_FILE", "docker-compose.yml")


@task()
def generate_data_dashboard(ctx, cosmogony_file_name="cosmogony.json"):
    _run_container(
        ctx,
        "data-dashboard",
        f"--cosmogony=/mnt/data/{cosmogony_file_name} --output=/mnt/data-dashboard/test_results.json",
    )
