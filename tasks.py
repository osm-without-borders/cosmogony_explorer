from invoke import task
import os
import logging

logging.basicConfig(level=logging.INFO)


@task()
def run_local(ctx, cosmogony_file_name, build_dockers=False):
    pop_stack(ctx, build_dockers)
    run_explorer(ctx, cosmogony_file_name, restart_tiles=True)
    open_browser(ctx)

@task()
def open_browser(ctx):
    explorer_port = ctx.run("""
        docker inspect -f '{{(index .NetworkSettings.Ports "80/tcp" 0).HostPort}}' $(docker-compose ps -q explorer)
    """, hide=True)
    port = explorer_port.stdout.split('\n')[0]
    explorer_url = f'http://localhost:{port}'
    print(f'Cosmogony explorer is running on {explorer_url}')
    if ctx.run('which sensible-browser', warn=True, hide=True).ok:
        ctx.run(f"sensible-browser '{explorer_url}/#/2.5/32/0'")


@task()
def pop_stack(ctx, build_dockers=False):
    if build_dockers:
        ctx.run("docker-compose build --pull", env={"COMPOSE_FILE": 'docker-compose.build.yml'})
    ctx.run("docker-compose up -d")


def _run_container(ctx, container_name, job, cosmogony_data_dir=None, continue_on_fail=False):
    main_docker_files = _get_docker_compose()
    run_docker_files = {"COMPOSE_FILE": main_docker_files + ":docker-compose.run.yml"}
    if cosmogony_data_dir:
        run_docker_files['PATH_TO_COSMOGONY_DIR'] = cosmogony_data_dir
    ctx.run(f"docker-compose run --rm {container_name} {job}", env=run_docker_files, warn=continue_on_fail)


@task(default=True)
def run_explorer(ctx, cosmogony_file_name="cosmogony.json", restart_tiles=False):
    cosmogony_data_dir, cosmogony_file_name = os.path.split(os.path.realpath(cosmogony_file_name))
    path_in_container = f"/mnt/data/{cosmogony_file_name}"
    _run_container(ctx,
        "importer",
        f"./import.py import_data {path_in_container}",
        cosmogony_data_dir=cosmogony_data_dir
    )

    ctx.run(
        "docker-compose exec tiles /usr/bin/t_rex generate -c /config_generate.toml --minzoom 0 --maxzoom 6 --overwrite true --progress true",
        pty=True,
    )

    _run_container(ctx, "importer", f"./import.py publish")
    ctx.run("docker-compose exec tiles /publish_tiles.sh", pty=True)

    if restart_tiles:
        ctx.run("docker-compose restart tiles", pty=True)

    generate_data_dashboard(ctx, cosmogony_file_name, cosmogony_data_dir)

def _get_docker_compose():
    return os.environ.get("COMPOSE_FILE", "docker-compose.yml")


@task()
def generate_data_dashboard(ctx, cosmogony_file_name, cosmogony_data_dir):
    _run_container(
        ctx,
        "data-dashboard",
        f"--cosmogony=/mnt/data/{cosmogony_file_name} --output=/mnt/data-dashboard/test_results.json",
        cosmogony_data_dir=cosmogony_data_dir,
        continue_on_fail=True,
    )
