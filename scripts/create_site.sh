#!/bin/bash
# To run this script, you need the checked out git repository in the same directory
# as your public_html dir will be to hold Drupal.
#
# eg :
# cd /www/alq.test - your parent directory
# git clone https://github.com/camerongreen/alq.git
#
# Then run this script from the parent directory, eg 
#  DEFAULT_SITE_EMAIL="alq@whatever.org" ./alq/scripts/create_site.sh
# it will ask you for the db you've created's details, then create public_html
# add drupal to it, symlink your custom modules, themes etc
#

SITE_NAME="Animal Liberation Queensland"

GIT_DIR=alq
PUBLIC_DIR=public_html

# this is the user who will own the files, so you 
# can edit them etc
FILE_OWNER=$USER
# this is the webserver user so it can write stuff to directories etc
WEBSERVER_GROUP=www-data

# default settings for DB
DEFAULT_DB_USER=alq
DEFAULT_DB_NAME=alq_db
DEFAULT_DB_HOST=docker_db_1

#
# Output command status and exit if error
#
# $1 is message if command produced error
# $2 (optional) is message if command succeeded
function command_status {
  if [ $? -ne 0 ]
    then
      printf $1
      exit 1
  else 
    if [[ $2 ]]
      then
        printf $2
    fi
  fi
}

# go...

if [ -e $PUBLIC_DIR ]
  then
    echo "$PUBLIC_DIR already exists";
    exit 1;
fi

# first set up the database
read -p "Database user [${DEFAULT_DB_USER}]:" DB_USER
if [ -z $DB_USER ]
  then
    DB_USER=$DEFAULT_DB_USER
fi
read -s -p "Database (and Drupal admin user) passwd:" DB_PASSWD
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

command_status "Unable to connect to database\nPlease ensure you have created $DB_NAME and granted access to $DB_USER@$DB_HOST" "Connected to db";

read -p "Site email [${DEFAULT_SITE_EMAIL}]:" SITE_EMAIL
if [ -z $SITE_EMAIL ]
  then
  if [ -z $DEFAULT_SITE_EMAIL ]
    then
      echo "Site needs an email, see the comments at the top of"
      echo "this script for how to put a default one on command line"
      exit 1
  else 
      SITE_EMAIL=$DEFAULT_SITE_EMAIL
  fi
fi

drush make ${GIT_DIR}/scripts/drush.make $PUBLIC_DIR
command_status "Drush make failed";

ln -s ${PWD}/${GIT_DIR}/modules ${PUBLIC_DIR}/sites/all/modules/custom
ln -s ${PWD}/${GIT_DIR}/themes/alq ${PUBLIC_DIR}/sites/all/themes

pushd $PUBLIC_DIR
drush site-install standard --db-url="mysql://${DB_USER}:${DB_PASSWD}@${DB_HOST}/${DB_NAME}" --account-pass="$DB_PASSWD" --site-name="${SITE_NAME}" --site-mail="${SITE_EMAIL}"
popd

# Need to sort this out in docker container
#chgrp -R ${WEBSERVER_GROUP} ${PUBLIC_DIR}/sites/default/files
chmod ug+w ${PUBLIC_DIR}/sites/default/
chmod ug+w ${PUBLIC_DIR}/sites/default/files

pushd $PUBLIC_DIR
drush -y pm-disable toolbar
# Don't enable google_analytics, boost
drush -y pm-enable \
admin \
admin_menu \
alq_content_types_feature \
alq_editor_role_feature \
alq_help \
alq_menus_feature \
alq_news_feature \
alq_section_home_blocks \
alq_slideshow_feature \
alq_webforms_feature \
addtoany \
admin_menu \
advanced_help \
ckeditor \
ckeditor_link \
colorbox \
context \
ctools \
date \
devel \
diff \
email \
entity \
facebook_boxes \
features \
features_diff \
filefield_sources \
imageapi \
imce \
imce_wysiwyg \
jquery_plugin \
jquery_update \
libraries \
metatag \
module_filter \
nice_menus \
omega_tools \
pathauto \
responsive_menus \
rules \
site_map \
stage_file_proxy \
strongarm \
token \
token_filter \
ubercart \
uc_coupon \
views \
views_slideshow \
webform \
workbench \
xmlsitemap


# I won't -y this as you should note any new additions 
# and add to the drush.make script to save yourself time in the future
drush pm-update
popd


