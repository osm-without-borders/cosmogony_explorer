FROM python:2.7-stretch

RUN apt-get update
RUN apt-get -y install libgdal-dev

RUN pip install --global-option=build_ext --global-option="-I/usr/include/gdal" GDAL==2.1.3


RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN pip install pipenv

RUN echo 
RUN pipenv install --system --deploy

CMD gunicorn "TileStache:WSGITileServer('./tilestache.cfg')" -b 0.0.0.0:8000