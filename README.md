Animal Liberation Queensland
============================

This is the code for the website http://alq.org.au


# Build intro

The development build is all done through Docker.  This ensures that all the required dependencies can be downloaded without polluting the developers machine.

The prefix of 269 is used for all external ports.  So port 80 on the web container will be port 26980 on your localhost.

# Installation

* Ensure you have docker and docker-compose installed
* mkdir alq.test
* cd !$
* mkdir sql
* git clone https://github.com/camerongreen/alq.git
* mkdir public_html
* cd alq/docker

Start the docker environment by running the following (sudo the docker commands if you have set it up to require root):

    MYSQL_ROOT_PASSWORD=secret MYSQL_DATABASE=alq_db MYSQL_USER=alq MYSQL_PASSWORD=secret docker-compose up -d

* cd ../../public_html

Create the empty site:

    docker exec -ti alq_web bash -c "ADMIN=admin ADMIN_EMAIL=alq@camerongreen.org ../alq/scripts/create_site.sh"
    
If you have a copy of the ALQ database, copy your gzipped sql file into the directory outlined in docker-compose.yml:

    docker exec -ti alq_web bash -c 'ADMIN_EMAIL=alq@camerongreen.org ../alq/scripts/import_prod_db.sh'
    
# Running
    
Once the initialisation code has been run the first time, from then on you can via:

    docker-compose up -d


# Tests

To run the nightwatch tests, from the docker directory:

    docker exec -ti alq_test_runner bash -c ./run-tests.sh
    
You can inspect the running tests, by using VNC.  For me that involved:

* Installing remmima and the VNC plugin via aptitude
* Creating a new VNC connection to the exposed port, by setting the server to 0.0.0.0:26959

If you want to drush etc, in the docker directory:

    docker exec -ti alq_web bash -c 'drush cc all'
