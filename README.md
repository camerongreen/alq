Animal Liberation Queensland
============================

This is the code for the website http://alq.org.au


# Build intro

The development build is all done through Docker.  This ensures that all the required dependencies can be downloaded without polluting the developers machine.


# Installation

The prefix of 269 is used for all external ports.  So port 80 on the web container will be port 26980 on your localhost.

First time run with the following, where root password is anything you want, and mysql user/password/db is from your settings.php file:

    MYSQL_ROOT_PASSWORD=secret MYSQL_DATABASE=alq_db MYSQL_USER=alq MYSQL_PASSWORD=secret docker-compose up

Subsequently you don't need the db credentials so just the usual:

    docker-compose up

To create the empty site:

    docker-compose run -e DEFAULT_SITE_EMAIL="alq@example.com" web ../alq/scripts/create_site.sh

To population an existing ALQ database into the mysql container, copy your gzipped sql file into the sql directory as outlined in web volumes in the docker-compose.yml:

    docker-compose run -e DEFAULT_SITE_EMAIL="alq@example.com" web ../alq/scripts/import_prod_db.sh

# Tests

To run the nightwatch tests (I run them in FF because I develop on Chrome):

    docker run -d --name selenium-fx -p 26944:4444 selenium/standalone-firefox-debug:2.47.1
    docker-compose run --rm web bash -c "cd ../alq/test;./run-tests.sh"

