Animal Liberation Queensland
============================

This is the code for the website http://alq.org.au


# Build intro

The development build is all done through Docker.  This ensures that all the required dependencies can be downloaded without polluting the developers machine.

The prefix of 269 is used for all external ports.  So port 80 on the web container will be port 26980 on your localhost.

# Installation

* Add alq.test to your /etc/hosts file
* Ensure you have docker and docker-compose installed
* mkdir alq.test
* cd !$
* mkdir sql
* git clone https://github.com/camerongreen/alq.git
* COMPOSER=alq/docker/config/composer.json composer install
* mkdir public_html
* cd alq/docker

Start the docker environment by running the following (sudo the docker commands if you have set it up to require root):

    MYSQL_ROOT_PASSWORD=secret MYSQL_DATABASE=alq_db MYSQL_USER=alq MYSQL_PASSWORD=secret docker-compose up -d

Create the empty site:

    docker exec -ti alq_web bash -c "cd public_html && ADMIN=admin ADMIN_EMAIL=alq@example.com ../alq/scripts/create_site.sh"
    
If you have a copy of the ALQ database, copy your gzipped sql file into the directory outlined in docker-compose.yml (by default called alq_latest.sql.gz):

    docker exec -ti alq_web bash -c 'cd public_html && ADMIN_EMAIL=alq@example.com ../alq/scripts/import_prod_db.sh'
    
# Running
    
Once the initialisation code has been run the first time, from then on you can via:

    docker-compose up -d
    
# Emailing

The SMTP module is installed in development, so you can use it to send emails if you 
have a valid SMTP server (ie the one your internet provider uses)

To set it up in development for eg the ALQ MPs module:
 * Go into System -> SMTP Authentication Support
 * Turn on module
 * Put in SMTP Server settings (smtp.gmail.com, Port 465, Use SSL)
 * Put Gmail address in for SMTP Authentication username, and generate app password from Google
 * Log everything
 * Go into System -> Mail System
 * New Setting - ALQ MPs module, key is campaign_confirmation_message
 * New Class - Format: MimeMailSystem, mail: SmtpMailSystem
 * Assign new class to new setting
 
// todo: put this in the import_prod.sh script

# Tests

To run the nightwatch tests, from the docker directory:

    docker exec -ti alq_test_runner bash -c ./run-tests.sh
    
You can inspect the running tests, by using VNC.  For me that involved:

* Installing remmima and the VNC plugin via aptitude
* Creating a new VNC connection to the exposed port, by setting the server to 0.0.0.0:26959

If you want to drush etc, in the docker directory:

    docker exec -ti alq_web bash -c 'drush cc all'
    
    
# XDebugging

## Web

I set up a server for alq.test for PHPStorm, the most important thing is to get the path mappings right, and to change the port to 26980.

| Local site folder | Absolute path on server    |
|-------------------|----------------------------|
| public_html       | /var/www/html              |
| alq/modules       | /var/www/alq/modules       | 
| alq/themes/alq    | /var/www/alq/themes/alq    |
| alq/themes/rodeos | /var/www/alq/themes/rodeos |

Then use an xdebug extension in your browser to turn it on.

## Command line

All I had to do in PHPStorm was to set up a normal debug server called alq.test as per the web debug and send it through to drush as a variable eg:

    docker exec -ti alq_web bash -c 'PHP_IDE_CONFIG="serverName=alq.test" drush -l rodeos alq-import-emailees emailees.json'
