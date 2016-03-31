#!/bin/bash
# 
# This script is useful for pulling the production dbs across to development
# it turns on the devel module etc.
#
# Step 1: Pull a gzipped version of the prod db somewhere
# Step 2: Run this script from the drupal root directory, eg
#   ADMIN_EMAIL="alq@whatever.org" ../alq/scripts/import_prod_db.sh
# it will ask you for the drupal db details, import the dump
# file from prod you've downloaded into it, enable and disable some 
# mods, set some values etc
#

DEFAULT_PROD_HOST="http://alq.org.au"

# this is the user who will own the files, so you
# can edit them etc
FILE_OWNER=$USER
# this is the webserver user so it can write stuff to directories etc
WEBSERVER_GROUP=www-data

# default settings for DB
DEFAULT_DB_USER=alq
DEFAULT_DB_NAME=alq_db
DEFAULT_DB_HOST=alq_db
DEFAULT_DB_FILE=../sql/alq_latest.sql.gz

# hosting company work around has custom drush path
if [ -f ~/.drush_alias ]; then
        . ~/.drush_alias
fi

# first set up the database
read -p "Database user [${DEFAULT_DB_USER}]:" DB_USER
if [ -z $DB_USER ]
  then
    DB_USER=$DEFAULT_DB_USER
fi
read -s -p "Database passwd:" DB_PASSWD
# need a newline in the output here as -s swallows it
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

read -p "Site email [${ADMIN_EMAIL}]:" SITE_EMAIL
if [ -z $SITE_EMAIL ]
  then
  if [ -z $ADMIN_EMAIL ]
    then
      echo "Site needs an email, see the comments at the top of"
      echo "this script for how to put a default one on command line"
      exit 1
  else 
      SITE_EMAIL=$ADMIN_EMAIL
  fi
fi

read -p "Database sql gzipped file [${DEFAULT_DB_FILE}]:" DB_FILE
if [ -z $DB_FILE ]
  then
    DB_FILE=$DEFAULT_DB_FILE
fi

# drop and recreate database so that any rubbish hanging around, extra tables etc, is removed
echo "Dropping database ${DB_NAME}";
echo "DROP DATABASE IF EXISTS ${DB_NAME}" | mysql -h $DB_HOST -u $DB_USER -p$DB_PASSWD
echo "Recreating database ${DB_NAME}";
echo "CREATE DATABASE ${DB_NAME}" | mysql -h $DB_HOST -u $DB_USER -p$DB_PASSWD
echo "Importing database";
gunzip -c $DB_FILE | mysql -h $DB_HOST -u $DB_USER -p$DB_PASSWD $DB_NAME

if [ $? -ne 0 ]
  then
    echo "Unable to import database"
    exit 1
else
  echo "Imported db"
fi

# enable all your dev modules
drush -y pm-enable context_ui devel views_ui stage_file_proxy features_diff smtp

# disable production modules
drush -y pm-disable googleanalytics boost captcha

# set site variables to development values
drush vset site_mail ${SITE_EMAIL}
drush vset file_private_path /tmp/private
drush vset file_temporary_path /tmp
drush vset uc_paypal_wpp_server "https://api-3t.sandbox.paypal.com/nvp"
drush variable-set stage_file_proxy_origin $DEFAULT_PROD_HOST
drush vset preprocess_css 0
drush vset preprocess_js 0
drush vset error_level 2

# Now anonymise the users
echo "Anonymising user emails";
drush sqlq "UPDATE users SET mail='${SITE_EMAIL}'"

chmod 755 ./scripts/password-hash.sh
DB_PASSWD_HASH=$(./scripts/password-hash.sh "${DB_PASSWD}" | awk '{print $4;}' | perl -p -e 's/\s*//')
echo "Anonymising user passwords, setting to admin password";
drush sqlq "UPDATE users SET pass='${DB_PASSWD_HASH}'"

echo "Clearing cache"
drush cc all
