#!/bin/bash

[ "${FLOCKER}" != "$0" ] && exec env FLOCKER="$0" flock -en "$0" "$0" "$@" || :

cd /opt/puja-server-test
git pull
docker-compose build --no-cache
docker-compose rm -fs app
docker-compose -f docker-compose.yml -f docker-compose.server.yml up -d
docker image prune -f
