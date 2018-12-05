from contextlib import ContextDecorator
from apistar.backends.sqlalchemy_backend import Session
from apistar.exceptions import NotFound

from .models import Zone

class override_join_depth(ContextDecorator):
    def __init__(self, new_depth):
        self.new_depth = new_depth

    def __enter__(self):
        self.default_join_depth = Zone.children.property.strategy.join_depth
        Zone.children.property.strategy.join_depth = self.new_depth

    def __exit__(self, *args):
        Zone.children.property.strategy.join_depth = self.default_join_depth


def get_zone_with_children(session: Session, id: int):
    zone = session.query(Zone).get(id)
    if zone is None:
        raise NotFound

    children = list(zone.children)

    return {
        'zone': zone.as_json_with_bbox(),
        'children': [z.as_json() for z in children]
    }

@override_join_depth(1)
def get_zone_parents(session: Session, id: int):
    zone = session.query(Zone).get(id)
    if zone is None:
        raise NotFound
    parents = []
    current_zone = zone

    while current_zone.parent is not None:
        p = current_zone.parent
        parents.append(p)

        if p in parents[:-1]:
            # We found a cycle
            break

        current_zone = p

    return {
        'zone': zone.as_json_with_bbox(),
        'parents': [p.as_json() for p in parents],
    }
