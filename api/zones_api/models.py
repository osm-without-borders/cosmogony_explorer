from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey, text
from sqlalchemy.orm import relationship, backref
from sqlalchemy.orm import object_session
import json

Base = declarative_base()

class Zone(Base):
    __tablename__ = "zones"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    parent_id = Column('parent', Integer, ForeignKey('zones.id'))
    zone_type = Column(String)
    osm_id = Column(String)
    wikidata = Column(String)
    admin_level = Column(Integer)

    children = relationship('Zone',
        backref=backref('parent', remote_side=[id]),
        lazy='joined',
        join_depth=2 # Fetch zone, children and children's children with a single query
    )

    @property
    def bounding_box(self):
        query = text('select st_asgeojson(ST_Transform(st_envelope(geometry), 4326)) from zones where id = :id')
        row = object_session(self).execute(query, {'id': self.id}).first()
        if row is None:
            return None
        return row[0]

    @property
    def osm_link(self):
        if ':' in self.osm_id:
            osm_path = self.osm_id.replace(':','/')
        else:
            # Old versions of cosmogony use integers as ids (relations only)
            osm_path = f'relation/{self.osm_id}'
        return f'https://www.openstreetmap.org/{osm_path}'

    def as_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'parent': self.parent_id,
            'zone_type': self.zone_type,
            'osm_id': self.osm_id,
            'osm_link': self.osm_link,
            'wikidata': self.wikidata,
            'admin_level': self.admin_level,
            'nb_children': len(self.children),
        }

    def as_json_with_bbox(self):
        res = self.as_json()
        res['bbox'] = json.loads(self.bounding_box)
        return res
