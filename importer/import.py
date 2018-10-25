#!/usr/bin/env python

from os import environ
import psycopg2
import sys
import ijson.backends.yajl2_cffi as ijson
import simplejson as json
import fire
from retrying import retry


# we wait a bit for postgres to be ready since if used with docker, so docker might take a while to start
@retry(stop_max_delay=10000, retry_on_exception=psycopg2.OperationalError)
def _pg_connect():
    dbname = environ.get('POSTGRES_DB')
    user = environ.get('POSTGRES_USER')
    password = environ.get('POSTGRES_PASSWORD')
    return psycopg2.connect(
        f'host=postgres dbname={dbname} user={user} password={password}'
    )


def _pg_execute(sql, params=None):
    if params is None:
        params = {}
    with _pg_connect() as conn:
        with conn.cursor() as cur:
            cur.execute(sql, params)

SINGLE_INSERT = """
    INSERT INTO import.zones
    VALUES (
        %(id)s, %(parent)s, %(name)s,
        %(admin_level)s, %(zone_type)s,
        %(osm_id)s, %(wikidata)s,
        ST_Transform(ST_SetSRID(ST_GeomFromGeoJSON(%(geometry)s), 4326), 3857)
    )
"""


def _import_cosmogony_to_pg(cosmogony_path):
    _pg_execute("""
        CREATE SCHEMA IF NOT EXISTS import;
        DROP TABLE IF EXISTS import.zones;

        CREATE TABLE IF NOT EXISTS import.zones(
            id bigint NOT NULL,
            parent bigint,
            name varchar,
            admin_level int,
            zone_type varchar,
            osm_id varchar,
            wikidata varchar,
            geometry geometry,
            PRIMARY KEY (id)
        )
        WITH (OIDS=FALSE);

        CREATE INDEX ON import.zones USING gist(geometry);

        CREATE INDEX ON import.zones (parent);
    """)


    print('Importing cosmogony to pg...')
    
    with open(cosmogony_path, 'rb') as f:
        zones = ijson.items(f, 'zones.item')

        with _pg_connect() as conn:
            with conn.cursor() as cur:
                for z in zones:
                    z['geometry'] = json.dumps(z.pop('geometry'))
                    cur.execute(SINGLE_INSERT, z)

    print('Import done.')


def import_data(cosmogony_path):
    """
    import the cosmogony data into pg

    The data are imported in an 'import' schema.

    The `publish` method needs to be called to make the data available
    """
    return _import_cosmogony_to_pg(cosmogony_path)


def publish():
    """
    make the imported data available.

    atomic operation that move the `import` schema to `public`.
    """
    _pg_execute("""
        DROP TABLE if exists public.zones;

        ALTER TABLE import.zones SET SCHEMA public;
    """)


if __name__ == "__main__":
    fire.Fire()
