#!/usr/bin/env python

from os import environ
import psycopg2
import sys
import ijson.backends.yajl2_cffi as ijson
import simplejson as json


def pg_connect():
    dbname = environ.get('POSTGRES_DB')
    user = environ.get('POSTGRES_USER')
    password = environ.get('POSTGRES_PASSWORD')
    return psycopg2.connect(
        f'host=postgres dbname={dbname} user={user} password={password}'
    )


def pg_execute(sql, params=None):
    if params is None:
        params = {}
    with pg_connect() as conn:
        with conn.cursor() as cur:
            cur.execute(sql, params)


SINGLE_INSERT = """
    INSERT INTO zones
    VALUES (
        %(id)s, %(parent)s, %(name)s,
        %(admin_level)s, %(admin_type)s, 
        ST_SetSRID(ST_GeomFromGeoJSON(%(geometry)s), 4326)
    )
"""

def import_cosmogony_to_pg(cosmogony_path):
    pg_execute("""
        CREATE TABLE IF NOT EXISTS public.zones(
            id bigint NOT NULL,
            parent bigint,
            name varchar,
            admin_level int,
            admin_type varchar,
            geometry geometry,
            CONSTRAINT zones_pkey PRIMARY KEY (id)
        )
        WITH (OIDS=FALSE);

        CREATE INDEX IF NOT EXISTS zones_geometry_idx 
            ON zones USING gist(geometry);
    """)


    print('Importing cosmogony to pg...')
    
    with open(cosmogony_path, 'rb') as f:
        zones = ijson.items(f, 'zones.item')

        with pg_connect() as conn:
            with conn.cursor() as cur:
                for z in zones:
                    z['geometry'] = json.dumps(z.pop('geometry'))
                    cur.execute(SINGLE_INSERT, z)

    print('Import done.')


if __name__ == "__main__":
    if len(sys.argv) <= 1:
        print('Usage: import.py [COSMOGONY_PATH]')
    else:
        import_cosmogony_to_pg(sys.argv[1])
