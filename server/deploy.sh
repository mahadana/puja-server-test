#!/bin/bash

[ "${FLOCKER}" != "$0" ] && exec env FLOCKER="$0" flock -en "$0" "$0" "$@" || :

set -eu

log="/var/log/puja-server-test-deploy.log"

(
  echo "$(date) start $0"

  cd /opt/puja-server-test
  git pull

  function docker-compose-production {
    docker-compose -f docker-compose.yml -f docker-compose.production.yml "$@"
  }

  docker-compose-production build --no-cache
  docker-compose-production rm -fs app
  docker-compose-production up -d
  docker image prune -f

  echo "$(date) end $0"

) 2>&1 | tee -a "$log"
