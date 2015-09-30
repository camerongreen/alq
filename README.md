Animal Liberation Queensland
============================

This is the code for the website http://alq.org.au


# Build intro

The development build is all done through Docker.  This ensures that all the required dependencies can be downloaded without polluting the developers machine.


# Installation

The prefix of 269 is used for all external ports.  So port 80 on the web container will be port 26980 on your localhost.

First time run with the following, where root password is anything you want, and mysql user/password/db is from your settings.php file:

    MYSQL_ROOT_PASSWORD=secret MYSQL_DATABASE=alq_db MYSQL_USER=alq MYSQL_PASSWORD=secret docker-compose up

After you've initialised everything then the usual:

    docker-compose up -d

To create the empty site:

    docker-compose run --rm -e ADMIN=admin -e ADMIN_EMAIL="alq@example.com" web ../alq/scripts/create_site.sh

To population an existing ALQ database into the mysql container, copy your gzipped sql file into the sql directory as outlined in web volumes in the docker-compose.yml:

    docker-compose run --rm -e ADMIN_EMAIL="alq@example.com" web ../alq/scripts/import_prod_db.sh

# Tests

To run the nightwatch tests:

    docker-compose run --rm test-runner bash -c ./run-tests.sh

