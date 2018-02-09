#!/usr/bin/env bash

set -e

if [ -z  "$1" ]; then
	echo "Usage: run_explorer.sh [COSMOGONY_FILE]"
	exit 1
fi

sudo docker-compose up -d

echo "Import to Postgis will start..."
sleep 10 # Waiting for postgres
sudo docker-compose run -v "`dirname $(realpath $1)`:/tmp/volume" cosmogony-importer ./import.py /tmp/volume/`basename $1`

echo "Generating tiles..."
sudo docker-compose exec cosmogony-tiles /usr/bin/t_rex generate -c /config.toml --minzoom 0 --maxzoom 8 --overwrite true --progress true  --extent -15,30,45,85

sensible-browser "http://localhost:8585/#2.5/32/0"
