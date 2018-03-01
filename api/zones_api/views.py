from apistar.backends.sqlalchemy_backend import Session
from apistar.exceptions import NotFound

from .models import Zone


def get_zone_with_children(session: Session, id: int):
    zone = session.query(Zone).get(id)
    if zone is None:
        raise NotFound

    children = list(zone.children)

    return {
        'zone': zone.as_json(with_bbox=True),
        'children': [z.as_json(with_bbox=False) for z in children]
    }


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
        'zone': zone.as_json(with_bbox=True),
        'parents': [p.as_json(with_bbox=False) for p in parents],
    }
