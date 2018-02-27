From node:8.9-stretch

RUN rm /tmp/cosmo_build -rf&&\
  apt update && apt install git -y&&\
  apt install nginx -y

WORKDIR /tmp/cosmo_build

COPY nginx.vh.default.conf /etc/nginx/conf.d/default.conf

RUN mkdir -p /tmp/cosmo_build
COPY . /tmp/cosmo_build
RUN cd /tmp/cosmo_build&&\
  npm install&&\
  node ./node_modules/webpack/bin/webpack --mode='development'&&\
  cp /tmp/cosmo_build/. /usr/share/nginx/html/ -r

CMD ["nginx", "-g", "daemon off;"]