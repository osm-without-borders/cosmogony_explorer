from invoke import task
import os
import logging

logging.basicConfig(level=logging.INFO)

@task()
def run_local(ctx, cosmogony_file, build_dockers=False):
    pop_stack(ctx)
    run_explorer(ctx, cosmogony_file, use_local_file=True)
    ctx.run("sensible-browser 'http://localhost:8585/#/2.5/32/0'")

@task()
def pop_stack(ctx, build_dockers=False):
    if build_dockers:
        ctx.run("docker-compose build --pull")
    ctx.run("docker-compose up -d")
    ctx.run("sleep 10") # TODO do better to wait for pg

@task(default=True)
def run_explorer(ctx, cosmogony_file, use_local_file=False):
    main_docker_files = _get_docker_compose()
    run_docker_files = {'COMPOSE_FILE': main_docker_files + ':docker-compose.run.yml'}
        

    if use_local_file:
        # TODO com'
        file_name = os.path.basename(cosmogony_file)
        path_in_container = f"/mnt/data/{file_name}"
        volume = f"-v `dirname $(realpath {cosmogony_file})`:/mnt/data"
    else:
        # TODO com'
        volume = ""
        path_in_container = cosmogony_file

    ctx.run(f"docker-compose run --rm {volume} importer ./import.py import_data {path_in_container}", env=run_docker_files)

    ctx.run("docker-compose exec tiles /usr/bin/t_rex generate -c /config_generate.toml --minzoom 0 --maxzoom 6 --overwrite true --progress true", pty=True)

    ctx.run("docker-compose run --rm importer ./import.py publish", env=run_docker_files)
    ctx.run("docker-compose exec tiles /publish_tiles.sh", pty=True)

def _get_docker_compose():
    return os.environ.get('COMPOSE_FILE', 'docker-compose.yml')
