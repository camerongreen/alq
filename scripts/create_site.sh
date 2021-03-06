#!/bin/bash
# To run this script, you need the checked out git repository in the same directory
# as your public html dir will be to hold Drupal.
#
# eg :
# git clone https://github.com/camerongreen/alq.git
# mkdir public_html
# cd !$
# ADMIN="admin" ADMIN_EMAIL="alq@whatever.org" ../alq/scripts/create_site.sh
#
# It will ask you for the db you've created's details, then
# add drupal to it, symlink your custom modules, themes etc.
#

set -ex

SITE_NAME="Animal Liberation Queensland"

if [ -z ${GIT_DIR} ]
  then
    GIT_DIR=/var/www/html/alq
fi

# this is the user who will own the files, so you
# can edit them etc
FILE_OWNER=www-data
# this is the webserver user so it can write stuff to directories etc
WEBSERVER_GROUP=www-data

# default settings for DB
DEFAULT_DB_USER=alq
DEFAULT_DB_NAME=alq_db
DEFAULT_DB_HOST=alq-db

MODULES_DIR=sites/all/modules/custom
THEMES_DIR=sites/all/themes/custom

# hosting company work around has custom drush path
if [ -f ~/.drush_alias ]
  then
    . ~/.drush_alias
fi

if [ -z ${CIRCLECI} ]
then
  DRUSH="drush -v"
else
  DRUSH=~/project/vendor/bin/drush
fi

#
# Output command status and exit if error
#
# $1 is message if command produced error
# $2 (optional) is message if command succeeded
function command_status {
  if [ $? -ne 0 ]
    then
      echo $1
      exit 1
  else 
    if [[ $2 ]]
      then
        echo $2
    fi
  fi
}

# go...
# check site admin has value
if [ -z ${ADMIN} ]
  then
    echo "ADMIN env variable required"
    exit 1
fi

# set up the database
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
    read -s -p "Database (and Drupal admin user) passwd:" DB_PASSWD
    # need a newline in the output here as -s swallows it
    echo ""
    if [ -z ${DB_PASSWD} ]
      then
        echo "DB Password is required";
        exit 1
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

command_status "Unable to connect to database\nPlease ensure you have created ${DB_NAME} and granted access to ${DB_USER}@${DB_HOST}" "Connected to db";

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

${DRUSH} make ${GIT_DIR}/scripts/drush.make .

command_status "Drush make failed" "Drush make completed";

# remove link if it exists
if [ -e "${MODULES_DIR}" ]
then
  echo "Removing module link"
  rm "${MODULES_DIR}"
fi

if [ -e "${THEMES_DIR}" ]
then
  echo "Removing theme link"
  rm "${THEMES_DIR}"
fi

echo "Linking directories"
ln -s ${GIT_DIR}/modules "${MODULES_DIR}"
ln -s ${GIT_DIR}/themes "${THEMES_DIR}"

echo "Site install commencing"

${DRUSH} -y site-install standard install_configure_form.update_status_module='array(FALSE,FALSE)' --db-url="mysql://${DB_USER}:${DB_PASSWD}@${DB_HOST}/${DB_NAME}" --account-pass="${DB_PASSWD}" --site-name="${SITE_NAME}" --site-mail="${SITE_EMAIL}" --account-name="${ADMIN}" --account-mail="${SITE_EMAIL}"

command_status "Error installing site" "Site install completed";


# Need to sort this out in docker container
#chgrp -R ${WEBSERVER_GROUP} sites/default/files
chmod ug+w sites/default/
chmod ug+w sites/default/files

${DRUSH} -y pm-disable toolbar

MODULES=(
  addtoany
  admin
  admin_menu
  advanced_help
  captcha
  ckeditor
  ckeditor_link
  colorbox
  context
  ctools
  date
  devel
  diff
  email
  entity
  facebook_boxes
  features
  features_diff
  field_collection
  filefield_sources
  imageapi
  imce
  imce_wysiwyg
  jquery_plugin
  jquery_update
  libraries
  mailsystem
  metatag
  mimemail
  mimemail_compress
  module_filter
  nice_menus
  node_reference
  omega_tools
  pathauto
  picture
  references
  responsive_menus
  rules
  smtp
  site_map
  stage_file_proxy
  strongarm
  token
  token_filter
  uc_ajax_admin
  uc_attribute
  uc_catalog
  uc_coupon
  uc_flatrate
  uc_paypal
  views
  views_slideshow
  webform
  workbench
  xmlsitemap
)

for MODULE in "${MODULES[@]}"
do
  ${DRUSH} -y pm-enable ${MODULE}
done

# not enabled prod modules
# googleanalytics
# google_tag
# uc_googleanalytics
# boost

# You should note any new additions
# and add to the drush.make script to save yourself time in the future
${DRUSH} -y pm-update

# enable alq modules and features
${DRUSH} -y pm-enable \
  alq \
  alq_content_types_feature \
  alq_editor_role_feature \
  alq_help \
  alq_menus_feature \
  alq_mps_feature \
  alq_news_feature \
  alq_section_home_blocks \
  alq_slideshow_feature \
  alq_webforms_feature

# has to be done seperately
${DRUSH} -y pm-enable \
  alq_mps

# enable theme
${DRUSH} vset theme_default alq2

echo "Completed"

