#!/bin/bash

[ "${FLOCKER}" != "$0" ] && exec env FLOCKER="$0" flock -en "$0" "$0" "$@" || :

cd /opt/puja-server-test
git pull
docker-compose stop
docker-compose up -d
