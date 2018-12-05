from os import environ

from apistar import Include, Route
from apistar.frameworks.wsgi import WSGIApp as App
from apistar.backends import sqlalchemy_backend
from apistar.renderers import JSONRenderer

from zones_api.models import Base
from zones_api.urls import api_urls

routes = []
routes += api_urls

# Configure database settings.
dbname = environ.get('POSTGRES_DB')
dbuser = environ.get('POSTGRES_USER')
dbhost = environ.get('POSTGRES_HOST')
password = environ.get('POSTGRES_PASSWORD')

settings = {
    "DATABASE": {
        "URL": f"postgresql://{dbuser}:{password}@{dbhost}/{dbname}",
        "METADATA": Base.metadata
    },
    "RENDERERS": [JSONRenderer()]
}

app = App(
    routes=routes,
    settings=settings,
    commands=sqlalchemy_backend.commands,  # Install custom commands.
    components=sqlalchemy_backend.components  # Install custom components.
)
