# Explore Cosmogony

The main goal of this tool is to have some visual and geographical feedback on [Cosmogony](https://github.com/osm-without-borders/cosmogony) output.

:construction::warning: This is a work in progress, and deeply connected to the Cosmogony output format :construction::warning:

![example](cosmogony_explorer.gif)

## Install

* Get some cosmogony output file (as `cosmogony.json`)
* Create a geojson out of it (`python3 cosmogony_to_geojson.py`)
* Import the geojson in a postgis database (`ogr2ogr -f "PostgreSQL" PG:"dbname=my_database user=postgres" "cosmogony.geojson"`)
* Serve this as vector tiles with [dirt-simple-postgis-http-api](https://github.com/tobinbradley/dirt-simple-postgis-http-api)
* Configure the frontend (set the tiles url with the port of your vector tiles api, and the name of your database)
* Enjoy !
