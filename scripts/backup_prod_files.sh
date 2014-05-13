#!/bin/bash
# This backs up the Drupal site uploaded files using rsync from production to my machine
ALQ_DOMAIN_NAME=alq.org.au
ALQ_HOST_USER=
ALQ_HOST=
ALQ_HOST_PORT=
ALQ_HOST_FILES_DIR=
ALQ_FILES_DIR=

# pull the latest backups
rsync -rve "ssh -p $ALQ_HOST_PORT" --delete --exclude='css' --exclude='js' ${ALQ_HOST_USER}@${ALQ_HOST}:${ALQ_HOST_FILES_DIR} $ALQ_FILES_DIR
