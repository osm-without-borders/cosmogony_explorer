#!/usr/bin/env bash

set -e

if [ -z  "$1" ]; then
	echo "Usage: run_explorer.sh [COSMOGONY_FILE]"
	exit 1
fi

docker-compose up -d

echo "Import to Postgis will start..."
sleep 10 # Waiting for postgres
docker-compose run -v "`dirname $(realpath $1)`:/tmp/volume" cosmogony-importer ./import.py /tmp/volume/`basename $1`

echo "Generating tiles..."
docker-compose exec cosmogony-tiles /usr/bin/t_rex generate -c /config.toml --minzoom 0 --maxzoom 6 --overwrite true --progress true

sensible-browser "http://localhost:8585/#2.5/32/0"
