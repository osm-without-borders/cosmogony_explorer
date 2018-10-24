# Explore Cosmogony

The main goal of this tool is to have some visual and geographical feedback on [Cosmogony](https://github.com/osm-without-borders/cosmogony) output.

![cosmogony demo](./demo.gif)


## Usage

This will run docker-compose containers, import the cosmogony zones to
Postgis, pre-generate tiles, and launch the explorer in your browser.

You may need to run it with `sudo`, as it launches `docker-compose` commands.  

The easiest way to run it:

```bash
pipenv install
```

```bash
pipenv run inv -e run-local
```

You can set a path to the cosmogony data by changing the environment variable `PATH_TO_COSMOGONY_DIR`.
You can do this either just with a classic environment variable, or by changing the file `.env`.
By default it will load the data in the `./cosmogony_data/` directory.

By default it will load a file named `cosmogony.json` in this directory. You can change the file name with the cli parameter `--cosmogony-file-name=<my_cosmogony_file>`

```bash
PATH_TO_COSMOGONY_DIR=./my_data_dir pipenv run inv -e run-local --cosmogony-file-name=cosmo_lux.json
```
