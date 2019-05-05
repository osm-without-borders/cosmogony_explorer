FROM python:3.6-slim

ENV PYTHONUNBUFFERED=1

RUN apt-get update
RUN apt-get -y install libyajl-dev

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY Pipfile* /usr/src/app/
RUN pip install pipenv
RUN pipenv install --system --deploy

COPY . /usr/src/app/

RUN chmod +x import.py
