#!/bin/sh

echo ":----Applying Database migrations"
python manage.py migrate

exec "$@"
