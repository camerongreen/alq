#!/bin/bash
# This creates a copy of the production database for testing purposes.

set -e

# Default settings for DB.
DEFAULT_DB_USER=alq
DEFAULT_DB_NAME=alq_db
DEFAULT_DB_HOST=alq_db

# Relative to public_html.
DEFAULT_OUTPUT_DIR=../alq/.circleci/sql
DEFAULT_OUTPUT_FILENAME=test_data.sql

# Tables not to dump data from.
NO_DATA_TABLES=(
alq_emails
cache
cache_admin_menu
cache_block
cache_bootstrap
cache_features
cache_field
cache_filter
cache_form
cache_image
cache_libraries
cache_menu
cache_metatag
cache_page
cache_path
cache_rules
cache_token
cache_update
cache_views
cache_views_data
search_index
search_total
uc_order_log
uc_orders
uc_order_products
uc_order_admin_comments
uc_payment_paypal_ipn
uc_payment_receipts
uc_order_comments
uc_order_line_items
uc_order_quotes
users
variable
watchdog
webform_submissions
webform_submitted_data
xmlsitemap
)

if [[ ! -d ${DEFAULT_OUTPUT_DIR} ]]
then
  echo "Output dir ${DEFAULT_OUTPUT_DIR} doesn't exist\n"
  exit
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

echo "SELECT 1;" | mysql -h ${DB_HOST} -u ${DB_USER} -p${DB_PASSWD} > /dev/null

if [ $? -ne 0 ]
  then
    echo "Unable to connect to database"
    echo "Please ensure you have granted access to ${DB_NAME} for ${DB_USER}@${DB_HOST}"
    exit 1
else
  echo "Connected to db"
fi

# Dump all the tables except those in the NO_DATA_TABLES variable.
TABLES=$(printf " --ignore-table=${DB_NAME}.%s" "${NO_DATA_TABLES[@]}")

# Limit number of rows from any one table.
COMMAND="mysqldump --where='1 limit 10000' ${TABLES} -h ${DB_HOST} -u ${DB_USER} -p${DB_PASSWD} ${DB_NAME} > ${DEFAULT_OUTPUT_DIR}/${DEFAULT_OUTPUT_FILENAME}"

eval $COMMAND

# Now dump the structure only of the other tables.
TABLES=$(printf " %s" "${NO_DATA_TABLES[@]}")

mysqldump --no-data -h ${DB_HOST} -u ${DB_USER} -p${DB_PASSWD} ${DB_NAME} ${TABLES} >> ${DEFAULT_OUTPUT_DIR}/${DEFAULT_OUTPUT_FILENAME}

# Add user 0 to the database.
mysqldump --no-create-info --where='uid = 0' -h ${DB_HOST} -u ${DB_USER} -p${DB_PASSWD} ${DB_NAME} users >> ${DEFAULT_OUTPUT_DIR}/${DEFAULT_OUTPUT_FILENAME}
