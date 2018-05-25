FROM sourcepole/t-rex

# we need to install envsubst
USER root
RUN apt update\
    && apt install -y gettext-base \
    && rm -rf /var/lib/apt/lists/*

# we template the configuration to have 2 configurations
# 1 during the import and 1 for the server
# this makes it possible to have 0 downtime import
COPY ./config.toml.template /tmp
COPY ./publish_tiles.sh /
RUN chmod +x /publish_tiles.sh

RUN TILESET_NAME=import_cosmogony TABLE_SPACE=import envsubst < /tmp/config.toml.template > /config_generate.toml
RUN TILESET_NAME=cosmogony TABLE_SPACE=public envsubst < /tmp/config.toml.template > /config_server.toml

ENTRYPOINT /usr/bin/t_rex serve -c /config_server.toml
