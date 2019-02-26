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

set -e

DEFAULT_PROD_HOST="http://alq.org.au"
DEFAULT_DEV_HOST="http://alq.test:26980"
DEFAULT_PRIVATE_DIR="/tmp/private"

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

if [ -z ${CIRCLECI} ]
then
  DRUSH=../vendor/bin/drush
else
  DRUSH=/home/circleci/project/vendor/bin/drush
fi

if [ ! -d ${DEFAULT_PRIVATE_DIR} ]
then
  mkdir ${DEFAULT_PRIVATE_DIR}
  chgrp ${WEBSERVER_GROUP} ${DEFAULT_PRIVATE_DIR}
  chmod 775 ${DEFAULT_PRIVATE_DIR}
fi

# first set up the database
if [ -z ${DB_USER} ]
then
  read -p "Database user [${DEFAULT_DB_USER}]:" DB_USER
  if [ -z ${DB_USER} ]
    then
      DB_USER=${DEFAULT_DB_USER}
  fi
fi

if [ -z ${CIRCLECI} ]
then
  if [ -z ${DB_PASSWD} ]
  then
    read -s -p "Database passwd:" DB_PASSWD
    # need a newline in the output here as -s swallows it
    echo ""
    if [ -z ${DB_PASSWD} ]
    then
      echo "DB Password is required";
      exit 1
    fi
  fi
fi

if [ -z ${DB_HOST} ]
  then
    read -p "Database host [${DEFAULT_DB_HOST}]:" DB_HOST
    if [ -z ${DB_HOST} ]
      then
        DB_HOST=${DEFAULT_DB_HOST}
    fi
fi

if [ -z ${DB_NAME} ]
  then
    read -p "Database name [${DEFAULT_DB_NAME}]:" DB_NAME
    if [ -z ${DB_NAME} ]
      then
        DB_NAME=${DEFAULT_DB_NAME}
    fi
fi

if [ -z ${CIRCLECI} ]
then
  echo "SELECT 1;" | mysql -h ${DB_HOST} -u ${DB_USER} -p${DB_PASSWD} ${DB_NAME} > /dev/null
else
  echo "SELECT 1;" | mysql -h ${DB_HOST} -u ${DB_USER} ${DB_NAME} > /dev/null
fi

if [ $? -ne 0 ]
  then
    echo "Unable to connect to database"
    echo "Please ensure you have granted access to ${DB_NAME} for ${DB_USER}@${DB_HOST}"
    exit 1
else
  echo "Connected to db"
fi

if [ -z ${SITE_EMAIL} ]
  then
  read -p "Site email [${ADMIN_EMAIL}]:" SITE_EMAIL
  if [ -z ${SITE_EMAIL} ]
  then
    if [ -z ${ADMIN_EMAIL} ]
    then
      echo "Site needs an email, see the comments at the top of"
      echo "this script for how to put a default one on command line"
      exit 1
    else
      SITE_EMAIL=${ADMIN_EMAIL}
    fi
  fi
fi

if [ -z ${DB_FILE} ]
  then
  read -p "Database sql gzipped file [${DEFAULT_DB_FILE}]:" DB_FILE
  if [ -z ${DB_FILE} ]
  then
    DB_FILE=${DEFAULT_DB_FILE}
  fi
fi

if [ ! -e ${DB_FILE} ]
then
  echo "Backup doesn't exist.  Looking for ${DB_FILE}"
  exit 1
fi

# drop and recreate database so that any rubbish hanging around, extra tables etc, is removed
if [ -z ${CIRCLECI} ]
then
  echo "Dropping database ${DB_NAME}";
  echo "DROP DATABASE IF EXISTS ${DB_NAME}" | mysql -h ${DB_HOST} -u ${DB_USER} -p${DB_PASSWD}
  echo "Recreating database ${DB_NAME}";
  echo "CREATE DATABASE ${DB_NAME}" | mysql -h $DB_HOST -u ${DB_USER} -p${DB_PASSWD}
  echo "Importing database";
  gunzip -c $DB_FILE | mysql -h $DB_HOST -u ${DB_USER} -p${DB_PASSWD} ${DB_NAME}
else
  echo "Importing database";
  gunzip -c $DB_FILE | mysql -h $DB_HOST -u ${DB_USER} ${DB_NAME}
fi

if [ $? -ne 0 ]
  then
    echo "Unable to import database"
    exit 1
else
  echo "Imported db"
fi

# enable all your dev modules
if [ -z ${CIRCLECI} ]
  ${DRUSH} -y pm-enable context_ui devel views_ui stage_file_proxy features_diff smtp
fi

# disable production modules
${DRUSH} -y pm-disable googleanalytics boost captcha

# set site variables to development values
${DRUSH} vset site_mail ${SITE_EMAIL}
${DRUSH} vset file_private_path ${DEFAULT_PRIVATE_DIR}
${DRUSH} vset file_temporary_path /tmp
${DRUSH} vset uc_paypal_wpp_server "https://api-3t.sandbox.paypal.com/nvp"
${DRUSH} vset uc_paypal_wps_server "https://www.sandbox.paypal.com/cgi-bin/webscr"
${DRUSH} vset uc_paypal_wps_email ${SITE_EMAIL}
${DRUSH} vset stage_file_proxy_origin ${DEFAULT_PROD_HOST}
${DRUSH} vset preprocess_css 0
${DRUSH} vset preprocess_js 0
${DRUSH} vset error_level 2
${DRUSH} vset extlink_exclude ${DEFAULT_DEV_HOST}

# Now anonymise the users
echo "Anonymising users (set password to default sql-sanitize password of...password)"
${DRUSH} sql-sanitize -y --sanitize-password=password --sanitize-email=${SITE_EMAIL}

echo "Clearing cache"
${DRUSH} cc all

echo "Done :) Maybe run drush up -y and update the makefile with any updates!"
