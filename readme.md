# Explore Cosmogony

The main goal of this tool is to have some visual and geographical feedback on [Cosmogony](https://github.com/osm-without-borders/cosmogony) output.

:construction::warning: This is a work in progress, and deeply connected to the Cosmogony output format :construction::warning:

![cosmogony demo](./demo.gif)


## Usage

This will run docker-compose containers, import the cosmogony zones to
Postgis, pre-generate tiles, and launch the explorer in your browser.


You may need to run it with `sudo`, as it launches `docker-compose` commands.  
```bash
./run_explorer.sh cosmogony.json
```
