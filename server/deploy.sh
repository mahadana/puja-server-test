#!/bin/bash

set -eu

lock="/var/lock/puja-server-test-deploy.lock"
log="/var/log/puja-server-test-deploy.log"

(
  flock -n 9 || exit 1

  echo "$(date) start puja-server-test deploy"

  cd /opt/puja-server-test
  git pull
  docker-compose build --no-cache
  docker-compose rm -fs app
  docker-compose -f docker-compose.yml -f docker-compose.server.yml up -d
  docker image prune -f

  echo "$(date) end puja-server-test deploy"

) >>"$log" 2>&1 9>"$lock" &
