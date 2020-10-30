#!/bin/bash

set -eu

if [[ "$(id -u)" != "0" ]]; then
  echo 'Must be run as root'
  exit 1
fi

apt-get install -y webhook
cp server/webhook.conf /etc/webhook.conf
perl -pi -e 's/SECRET/mysecret/' /etc/webhook.conf
# TODO ask for and manipulate secret
systemctl restart webhook.service

test -d /opt/puja-server-test || \
  git clone https://github.com/mahadana/puja-server-test.git /opt/puja-server-test
/opt/puja-server-test/server/setup.sh

cd /opt/puja-server-test

test -f .env || cat <<END > .env
DB_PORT=5432
DB_DATABASE=test
DB_USER=user
DB_PASSWORD=password
END

docker-compose down
git pull
docker-compose up -d
