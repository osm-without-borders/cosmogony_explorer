FROM python:3.6

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN pip install pipenv gunicorn meinheld
RUN pipenv install --system --deploy

ENTRYPOINT gunicorn app:app --bind=0.0.0.0:8000 --pid=pid --worker-class=meinheld.gmeinheld.MeinheldWorker --preload