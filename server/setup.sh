#!/bin/bash

set -eu

if [[ "$(id -u)" != "0" ]]; then
  echo 'Must be run as root'
  exit 1
fi

test -d /opt/puja-server-test || \
  git clone https://github.com/mahadana/puja-server-test.git /opt/puja-server-test

cd /opt/puja-server-test

test -f .env || cat <<END > .env
DB_PASSWORD=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 8)
END

test -x /usr/sbin/nginx || apt-get install -y nginx-light
test -x /usr/bin/certbot || apt-get install -y certbot
test -d /usr/share/doc/python3-certbot-nginx || apt-get install -y python3-certbot-nginx

certbot --nginx --non-interactive --agree-tos --email admin@pujas.live \
  --domain 'pujas.live' \
  --domain 'www.pujas.live' \
  --domain 'puja-server-test.pujas.live'

cp server/nginx.conf /etc/nginx/sites-available/puja-server-test
ln -sf ../sites-available/puja-server-test \
  /etc/nginx/sites-enabled/puja-server-test
systemctl restart nginx.service

test -x /usr/bin/webhook || apt-get install -y webhook
cp server/webhook.conf /etc/webhook.conf
perl -pi -e 's/SECRET/mysecret/' /etc/webhook.conf
# TODO ask for and manipulate secret
systemctl restart webhook.service

/opt/puja-server-test/server/deploy.sh
