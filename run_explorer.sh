#!/usr/bin/env bash

set -e

if [ -z  "$1" ]; then
	echo "Usage: run_explorer.sh [COSMOGONY_FILE]"
	exit 1
fi

sudo docker-compose up -d

echo "Import to Postgis will start..."
sleep 10 # Waiting for postgres
sudo docker-compose run -v "`dirname $(realpath $1)`:/tmp/volume" cosmogony-importer ./import.py /tmp/volume/$1

echo "Generating tiles..."
sudo docker-compose run cosmogony-api ./src/tilestache/scripts/tilestache-seed.py -c tilestache.cfg -l vector-zones -b -85 -179.999 85 179.999 -e pbf 0 1 2 3 4 

sensible-browser "http://localhost:8585/#2.5/32/0"
