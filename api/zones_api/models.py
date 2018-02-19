from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship, backref

Base = declarative_base()

class Zone(Base):
    __tablename__ = "zones"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    parent_id = Column('parent', Integer, ForeignKey('zones.id'))
    zone_type = Column(String)
    admin_level = Column(Integer)

    children = relationship('Zone',
    	backref=backref('parent', remote_side=[id])
    )

    def as_json(self):
    	return {
    		'id': self.id,
    		'name': self.name,
    		'parent': self.parent_id,
    		'zone_type': self.zone_type,
    		'admin_level': self.admin_level
    	}