From nginx:alpine

RUN apk update && apk add git

WORKDIR /usr/share/nginx/html

COPY nginx.vh.default.conf /etc/nginx/conf.d/default.conf

COPY ./*.html /usr/share/nginx/html/
