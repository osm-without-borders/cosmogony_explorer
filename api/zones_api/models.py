from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey
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
        lazy='joined'
    )

    @property
    def bounding_box(self):
        query = 'select st_asgeojson(ST_Transform(st_envelope(geometry), 4326)) from zones where id = :id'
        row = object_session(self).execute(query, {'id': self.id}).first()
        if row is None:
            return None
        return row[0]

    def as_json(self, with_bbox):
        j = {
            'id': self.id,
            'name': self.name,
            'parent': self.parent_id,
            'zone_type': self.zone_type,
            'osm_id': self.osm_id,
            'osm_link': f'https://www.openstreetmap.org/relation/{self.osm_id}', # TODO only relation for now
            'wikidata': self.wikidata,
            'admin_level': self.admin_level,
            'nb_children': len(self.children),
        }
        if with_bbox:
            j['bbox'] = json.loads(self.bounding_box)
        return j
