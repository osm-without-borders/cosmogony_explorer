from invoke import task
import os
import logging

logging.basicConfig(level=logging.INFO)


@task()
def run_local(ctx, cosmogony_file_name="cosmogony.json", build_dockers=False):
    pop_stack(ctx, build_dockers)
    run_explorer(ctx, cosmogony_file_name)
    ctx.run("sensible-browser 'http://localhost:8585/#/2.5/32/0'")


@task()
def pop_stack(ctx, build_dockers=False):
    if build_dockers:
        ctx.run("docker-compose build --pull")
    ctx.run("docker-compose up -d")


def _run_container(ctx, container_name, job):
    main_docker_files = _get_docker_compose()
    run_docker_files = {"COMPOSE_FILE": main_docker_files + ":docker-compose.run.yml"}
    ctx.run(f"docker-compose run --rm {container_name} {job}", env=run_docker_files)


@task(default=True)
def run_explorer(ctx, cosmogony_file_name="cosmogony.json"):

    path_in_container = f"/mnt/data/{cosmogony_file_name}"
    _run_container(ctx, "importer", f"./import.py import_data {path_in_container}")

    ctx.run(
        "docker-compose exec tiles /usr/bin/t_rex generate -c /config_generate.toml --minzoom 0 --maxzoom 6 --overwrite true --progress true",
        pty=True,
    )

    _run_container(ctx, "importer", f"./import.py publish")
    ctx.run("docker-compose exec tiles /publish_tiles.sh", pty=True)

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
