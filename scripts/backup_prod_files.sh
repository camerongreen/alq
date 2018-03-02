#!/bin/bash
# This backs up the Drupal site uploaded files using rsync from production to my machine
ALQ_SSH_ALIAS=alq
ALQ_HOST_FILES_DIR=
ALQ_FILES_DIR=
WWW_GROUP=

# chown the directors to import into so theres no permission problems
sudo chown -R $user:$WWW_GROUP $ALQ_FILES_DIR
sudo chmod -R g+w $ALQ_FILES_DIR

# pull the latest backups
rsync -rve "ssh" --delete --exclude='css' --exclude='js' ${ALQ_SSH_ALIAS}:${ALQ_HOST_FILES_DIR} $ALQ_FILES_DIR

# chown the files that are imported, prob unecessary here :)
sudo chown -R $user:$WWW_GROUP $ALQ_FILES_DIR
sudo chmod -R g+w $ALQ_FILES_DIR
