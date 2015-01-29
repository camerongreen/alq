#!/bin/bash
# This backs up the Drupal site uploaded files using rsync from production to my machine
ALQ_DOMAIN_NAME=alq.org.au
ALQ_HOST_USER=
ALQ_HOST=
ALQ_HOST_FILES_DIR=
ALQ_FILES_DIR=
WWW_GROUP=

# pull the latest backups
rsync -rve "ssh" --delete --exclude='css' --exclude='js' ${ALQ_HOST_USER}@${ALQ_HOST}:${ALQ_HOST_FILES_DIR} $ALQ_FILES_DIR
chown -R $user:$WWW_GROUP $ALQ_FILES_DIR
chmod -R g+w $ALQ_FILES_DIR
