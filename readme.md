# Explore Cosmogony

The main goal of this tool is to have some visual and geographical feedback on [Cosmogony](https://github.com/osm-without-borders/cosmogony) output.

![cosmogony demo](./demo.gif)

## Install

#### Requirements

 * docker
 * docker-compose
 * python >= 3.6

#### Quick guide to install Docker on Ubuntu
```bash
sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
sudo apt update
# to check which version you'll install: apt-cache policy docker-ce
sudo apt install docker-ce
# to check if the service is running as expected:
sudo systemctl status docker
# You need to add yourself to the docker group to avoid somea lot of "sudo":
sudo usermod -a -G docker `whoami`
# And now you need to logout then login again so it's taken into account!
```

## Usage

This will run docker-compose containers, import the cosmogony zones to
Postgis, pre-generate tiles, and launch the explorer in your browser.

You may need to run it with `sudo`, as it launches `docker-compose` commands.  

The easiest way to run it:

```bash
# Install python dependencies in a new virtualenv
pipenv install --deploy

# Start cosmogony explorer services and import cosmogony data from an input file
pipenv run inv -e run-local cosmogony.json
```

Accepted cosmogony formats are `.json` and `.jsonl.gz`.

> Note that during the import process the directory where the cosmogony file is located will
be mounted as a read-only docker volume.

## Development

If you want to change stuff in the repository, you need to build custom images.
To do this, you just need to add the `--build-dockers` argument to the `invoke` commands:

```bash
pipenv run inv -e run-local cosmogony.json --build-dockers
```
