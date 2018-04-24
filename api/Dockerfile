FROM python:3.6

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY Pipfile* ./

RUN pip install pipenv gunicorn meinheld
RUN pipenv install --system --deploy

COPY . ./

ENTRYPOINT gunicorn app:app --workers=3 --bind=0.0.0.0:8000 --pid=pid --worker-class=meinheld.gmeinheld.MeinheldWorker --preload
