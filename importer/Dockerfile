FROM python:3.6

RUN apt-get update
RUN apt-get -y install libyajl-dev

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN pip install pipenv
RUN pipenv install --system --deploy

RUN chmod +x import.py
