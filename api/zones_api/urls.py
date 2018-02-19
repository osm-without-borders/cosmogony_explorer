from apistar import Route

from .views import get_zone_with_children, get_zone_parents


api_urls = [
    Route('/zones/{id}', 'GET', get_zone_with_children),
    Route('/zones/{id}/parents', 'GET', get_zone_parents),
]