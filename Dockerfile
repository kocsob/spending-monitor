FROM alpine:latest

MAINTAINER Balazs Kocso

RUN apk add -U nodejs
RUN apk add -U git

ADD . /spending-monitor

WORKDIR /spending-monitor

RUN npm install
RUN node node_modules/bower/bin/bower --allow-root install
RUN npm install -g forever 

VOLUME [ "/spending-monitor/db" ]
CMD [ "forever", "app.js" ]

EXPOSE 3000
