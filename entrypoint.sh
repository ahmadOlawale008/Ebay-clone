#!/bin/sh
echo -e "\033[1m\033[33m|->Collecting static files\033[0m"
python manage.py collectstaic --noinput
echo -e "\033[1m\033[33m|->Applying database migration"
python manage.py makemigrations
python manage.py migrate
echo -e "\033[32m->Website started successfully text\033[0m"
exec "@"