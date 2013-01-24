#!/bin/bash
# To run this script, you need the checked out git repository in the same directory
# as your public_html dir will be to hold Drupal.
# You will also need a settings.php file in another directory in the same place with
# your db setup in it

# eg :
# /www/alq.test - parent directory
# /www/alq.test/code - git repo  
# /www/alq.test/docs/settings.php
#
# Then run this script from the parent directory, it will create public_html
# add drupal to it, then symlink the modules, themes, settings file etc
#

SITE_NAME="Animal Liberation Queensland"
DEFAULT_SITE_EMAIL="alq@camerongreen.org"

GIT_DIR=code
PUBLIC_DIR=public_html
SETTINGS_FILE=docs/settings.php

# this is the user who will own the files, so you 
# can edit them etc
FILE_OWNER=$USER
# this is the webserver user so it can write stuff to directories etc
WEBSERVER_GROUP=www-data

# default settings for DB
DEFAULT_DB_USER=alq
DEFAULT_DB_NAME=alq_db
DEFAULT_DB_HOST=localhost

if [ -e $PUBLIC_DIR ]
  then
    echo "$PUBLIC_DIR already exists";
    exit 1
fi

# first set up the database
read -p "Database user [${DEFAULT_DB_USER}]:" DB_USER
if [ -z $DB_USER ]
  then
    DB_USER=$DEFAULT_DB_USER
fi
read -s -p "Database (and Drupal admin user) passwd:" DB_PASSWD
echo ""
if [ -z $DB_PASSWD ]
  then
    echo "DB Password is required";
    exit 1
fi
read -p "Database host [${DEFAULT_DB_HOST}]:" DB_HOST
if [ -z $DB_HOST ]
  then
    DB_HOST=$DEFAULT_DB_HOST
fi
read -p "Database name [${DEFAULT_DB_NAME}]:" DB_NAME
if [ -z $DB_NAME ]
  then
    DB_NAME=$DEFAULT_DB_NAME
fi

echo "SELECT 1;" | mysql -h $DB_HOST -u $DB_USER -p$DB_PASSWD $DB_NAME > /dev/null

if [ $? -ne 0 ]
  then
    echo "Unable to connect to database"
    echo "Please ensure you have created $DB_NAME and granted access to $DB_USER@$DB_HOST"
    exit 1
else
  echo "Connected to db"
fi

read -p "Site email [${DEFAULT_SITE_EMAIL}]:" SITE_EMAIL
if [ -z $SITE_EMAIL ]
  then
    SITE_EMAIL=$DEFAULT_SITE_EMAIL
fi

drush make ${GIT_DIR}/scripts/drush.make $PUBLIC_DIR
ln -s ${GIT_DIR}/modules ${PUBLIC_DIR}/sites/all/modules/custom
ln -s ${GIT_DIR}/themes/alq ${PUBLIC_DIR}/sites/all/themes

pushd $PUBLIC_DIR
drush site-install standard --db-url="mysql://${DB_USER}:${DB_PASSWD}@${DB_HOST}/${DB_NAME}" --account-pass="$DB_PASSWD" --site-name="${SITE_NAME}" --site-mail="${SITE_EMAIL}"
popd

chgrp -R ${WEBSERVER_GROUP} ${PUBLIC_DIR}/sites/default/files
chmod g+w ${PUBLIC_DIR}/sites/default/files
