#!/bin/sh

pipenv run python manage.py collectstatic --no-input
pipenv run python manage.py migrate
pipenv run web &

envsubst < /etc/nginx/nginx.conf.tpl > /etc/nginx/nginx.conf

nginx -g "daemon off;"
