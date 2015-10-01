Animal Liberation Queensland
============================

This is the code for the website http://alq.org.au


# Build intro

The development build is all done through Docker.  This ensures that all the required dependencies can be downloaded without polluting the developers machine.


# Installation

The prefix of 269 is used for all external ports.  So port 80 on the web container will be port 26980 on your localhost.

Run with the following after you have created the alq_db database with a valid alq user in mysql:

    MYSQL_ROOT_PASSWORD=secret MYSQL_DATABASE=alq_db MYSQL_USER=alq MYSQL_PASSWORD=secret docker-compose up -d

Next time you run it you can ignore the MYSQL info and run with the usual:

    docker-compose up -d

If you have an empty public_html directory, create the empty site:

    docker exec -ti alq_web bash -c "ADMIN=admin ADMIN_EMAIL=alq@camerongreen.org ../alq/scripts/create_site.sh"

If you have a copy of the ALQ database, copy your gzipped sql file into the directory outlined in docker-compose.yml:

    docker exec -ti alq_web bash -c "ADMIN_EMAIL=alq@camerongreen.org ../alq/scripts/import_prod_db.sh"

# Tests

To run the nightwatch tests:

    docker exec -ti alq-test-runner_1 bash -c ./run-tests.sh

