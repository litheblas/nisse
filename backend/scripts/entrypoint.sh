#!/bin/sh

pipenv run python3 manage.py collectstatic --no-input

# TODO: Determine if we should run makemigrations in production?
pipenv run python manage.py makemigrations
pipenv run python manage.py migrate
pipenv run web &

envsubst < /etc/nginx/nginx.conf.tpl > /etc/nginx/nginx.conf

nginx -g "daemon off;"
