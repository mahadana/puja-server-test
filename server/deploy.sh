#!/bin/bash

[ "${FLOCKER}" != "$0" ] && exec env FLOCKER="$0" flock -en "$0" "$0" "$@" || :

set -eu

log="/var/log/puja-server-test-deploy.log"

(
  echo "$(date) start $0"

  cd /opt/puja-server-test
  git pull
  docker-compose -f docker-compose.server.yml build --no-cache
  docker-compose -f docker-compose.server.yml rm -fs app
  docker-compose -f docker-compose.server.yml up -d
  docker image prune -f

  echo "$(date) end $0"

) 2>&1 | tee -a "$log"
