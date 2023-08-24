FROM python:3.9-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED=1

RUN apt-get update
RUN apt-get -y install libyajl-dev libpq-dev

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY Pipfile* /usr/src/app/
RUN pip install pipenv
RUN pipenv install --system --deploy

COPY . /usr/src/app/

RUN chmod +x import.py
