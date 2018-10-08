#!/usr/bin/env bash

set -e

if [ -z  "$1" ]; then
	echo "Usage: run_explorer.sh [COSMOGONY_FILE]"
	exit 1
fi

docker-compose up -d --build

echo "Import to Postgis will start..."
sleep 10 # Waiting for postgres
docker-compose run -v "`dirname $(realpath $1)`:/tmp/volume" cosmogony-importer ./import.py import_data /tmp/volume/`basename $1`

echo "Generating tiles..."
docker-compose exec cosmogony-tiles /usr/bin/t_rex generate -c /config_generate.toml --minzoom 0 --maxzoom 6 --overwrite true --progress true

# publish the data so they can be used (without any downtime)
docker-compose run cosmogony-importer ./import.py publish
docker-compose exec cosmogony-tiles /publish_tiles.sh

sensible-browser "http://localhost:8585/#/2.5/32/0"
