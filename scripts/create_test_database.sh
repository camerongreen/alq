#!/bin/bash
# This creates a copy of the production database for testing purposes.

set -e

# Default settings for DB.
DEFAULT_DB_USER=alq
DEFAULT_DB_NAME=alq_db
DEFAULT_DB_HOST=alq-db

# Relative to public_html.
DEFAULT_OUTPUT_DIR=../alq/.circleci/data
DEFAULT_OUTPUT_FILENAME=test-data.sql

# Tables not to dump data from.
NO_DATA_TABLES=(
alq_emails
batch
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
captcha_sessions
field_collection_item_revision
field_revision_body
field_revision_comment_body
field_revision_field_address
field_revision_field_article_type
field_revision_field_body
field_revision_field_campaign_type
field_revision_field_cc
field_revision_field_confirmation_html
field_revision_field_confirmation_subject
field_revision_field_electorate
field_revision_field_electorate_type
field_revision_field_email
field_revision_field_emailee
field_revision_field_family_name
field_revision_field_fax
field_revision_field_files
field_revision_field_footer
field_revision_field_given_names
field_revision_field_image
field_revision_field_office
field_revision_field_parent_article
field_revision_field_party
field_revision_field_phone
field_revision_field_position
field_revision_field_postcode
field_revision_field_preferred_name
field_revision_field_qualifications
field_revision_field_slideshow
field_revision_field_slideshow_image
field_revision_field_state
field_revision_field_tags
field_revision_field_title
field_revision_field_toll_free_phone
field_revision_taxonomy_catalog
field_revision_uc_catalog_image
field_revision_uc_product_image
node_comment_statistics
queue
registry
registry_file
search_dataset
search_index
search_node_links
search_total
sessions
uc_coupons
uc_coupons_orders
uc_order_admin_comments
uc_order_comments
uc_order_line_items
uc_order_log
uc_order_products
uc_order_quotes
uc_orders
uc_payment_paypal_ipn
uc_payment_receipts
uc_shipments
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

# Add users 0 and 1 to the database.
mysqldump --no-create-info --where='uid = 0' -h ${DB_HOST} -u ${DB_USER} -p${DB_PASSWD} ${DB_NAME} users >> ${DEFAULT_OUTPUT_DIR}/${DEFAULT_OUTPUT_FILENAME}
echo "INSERT INTO users (uid, name, pass, mail, status) VALUES (1, 'testadmin', '', 'test@example.com', 1);" >> ${DEFAULT_OUTPUT_DIR}/${DEFAULT_OUTPUT_FILENAME};

# Add variables to database.  Note high probabilty of leaking information.
mysqldump --no-create-info --where='name NOT IN ("drupal_private_key", "googleanalytics_account", "mimemail_key",  "uc_paypal_api_password", "uc_paypal_api_signature", "uc_paypal_api_username")' -h ${DB_HOST} -u ${DB_USER} -p${DB_PASSWD} ${DB_NAME} variable >> ${DEFAULT_OUTPUT_DIR}/${DEFAULT_OUTPUT_FILENAME}

gzip ${DEFAULT_OUTPUT_DIR}/${DEFAULT_OUTPUT_FILENAME}
