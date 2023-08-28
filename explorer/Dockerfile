FROM node:8.9-stretch as builder
ARG http_proxy=http://10.100.9.1:2001
ARG https_proxy=http://10.100.9.1:2001
RUN mkdir -p /tmp/cosmo_build
COPY . /tmp/cosmo_build
RUN cd /tmp/cosmo_build &&\
  npm install &&\
  node ./node_modules/webpack/bin/webpack --mode='production' && \
  rm -rf ./node_modules

FROM nginx:alpine
COPY nginx.vh.default.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /tmp/cosmo_build/ /usr/share/nginx/html/
