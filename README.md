Animal Liberation Queensland
============================

This is the code for the websites alq.org.au and rethinkrodeos.com


# Build intro

The development build is all done through Docker.  This ensures that all the required dependencies can be downloaded without polluting the developers machine.

The prefix of 269 is used for all external ports.  So port 80 on the web container will be port 26980 on your localhost.

# Installation

* Add alq.test and rodeos.test to your /etc/hosts file
* Ensure you have docker and docker-compose installed
* mkdir alq.test
* cd !$
* mkdir sql
* git clone https://github.com/camerongreen/alq.git
* cd alq
* composer install
* cd ..
* mkdir public_html
* cd alq/docker

Start the docker environment by running the following (sudo the docker commands if you have set it up to require root):

    docker-compose up -d

Create the empty site:

    docker exec -ti alq-web bash -c "cd /var/www/html/public_html && ../alq/scripts/create_site.sh"
    
If you have a copy of the ALQ database (see Backups below), copy your gzipped sql file (by default called alq_latest.sql.gz) into a directory named sql at the same level as the alq git directory otherwise grab the one from the .circleci/data directory:

    docker exec -ti alq-web bash -c 'cd /var/www/html/public_html && ../alq/scripts/import_prod_db.sh'
    
## Rodeos installation
    
To get the rodeos website going, you will need to do the following in the sites directory:

* mkdir -p rodeos/files
* mkdir rodeos/themes
* ln -s rodeos rodeos.test
* pushd !$
* ln -s ../../../../alq/themes/rodeos/ .
* popd
* cp default/settings.php rodeos/
* Edit rodeos/settings.php and change the db name from alq_db to rodeos_db

Now Create the rodeos_db database in MySQL
* mysql -u root -h 0.0.0.0 -P 26906 -psecret
* CREATE DATABASE rodeos_db;
* GRANT ALL PRIVILEGES ON rodeos_db.* TO alq IDENTIFIED BY 'secret';

You will need a copy of the Rodeos database (see Backups below) which you can get from the backups on the website, copy your gzipped sql file (by default called rodeos_latest.sql.gz) into a directory named sql at the same level as the alq git directory:

    docker exec -ti alq-web bash -c 'cd /var/www/html/public_html && ../alq/scripts/import_prod_rodeos_db.sh'

    
# Running
    
Once the initialisation code has been run the first time, from then on you can via:

    docker-compose up -d
    
If you want to drush etc, in the docker directory:

    docker exec -ti alq-web bash -c 'cd public_html && drush cc all'
    

## Compiling styles

From the theme directory:

    npx node-sass --output css/ --recursive scss/
    
## Emailing

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

## Paypal

The import process should set the uc_paypal_wpp_server variable to the sandbox, but if
not you can just delete it and it sets it in the uc_paypal module backend.

Then you will need to go to developer.paypal.com and sign up for a sandbox business account.  Once you get the credentials, you'll need to set them in here:

'cd public_html && drush vset uc_paypal_wps_email {from_paypal}'
'cd public_html && drush vset uc_paypal_api_password {from_paypal}'
'cd public_html && drush vset uc_paypal_api_username {from_paypal}'
'cd public_html && drush vset uc_paypal_api_signature {from_paypal}'

To actually make a payment, you'll want to set up some sandbox personal accounts too.

    
# Tests

## Local

To run the nightwatch tests from the docker directory:

    docker exec -ti alq-web bash -c "cd alq/test && ./run-tests.sh"
    docker exec -ti alq-web bash -c "cd alq/test && ./run-tests.sh tests/test-email-campaign.js"
 
Note the main issue with running the tests is chrome and chromedriver versions.  

Try running apt install google-chrome-stable and check the version number, then make sure that matches
the package.json and run npm install.

Note II Tests which refer to older functionality which has been changed such as the membership and donation forms
have been moved to the old-test directory.
    
## CircleCI

We build and test this automatically on CircleCI.  Current build status is:

[![CircleCI](https://circleci.com/gh/camerongreen/alq.svg?style=svg)](https://circleci.com/gh/camerongreen/alq)

To create a subset of the test database, run the following:

docker exec -ti alq-web bash -c 'cd public_html && ../alq/scripts/create_test_database.sh'

Check it for leaking any private information (passwords, api keys etc).

    docker exec -ti alq-web bash -c 'zcat alq/.circleci/data/test-data.sql.gz'

To debug CircleCI builds rebuild via ssh then:
                         
    ssh -p portnum -L 8080:localhost:80 ip_address
                         
Then just go to localhost:8080 in your browser, and you have the full site.

    
# XDebugging

## Web

I set up a server for alq.test for PHPStorm, the most important thing is to get the path mappings right, and to change the port to 26980.

| Local site folder | Absolute path on server         |
|-------------------|---------------------------------|
| public_html       | /var/www/html/public_html       |
| alq/modules       | /var/www/html/alq/modules       | 
| alq/themes        | /var/www/html/alq/themes        |

Then run docker compose with the IP address of your PC, set this in the .env file.

Then use an xdebug extension in your browser to turn it on. 

I had an issue with having to set xdebug.idekey=PHPSTORM in the ini file, as it wasn't accepting it through the
environment variables.

## Command line

All I had to do in PHPStorm was to set up a normal debug server called alq.test as per the web debug and send it through to drush as a variable eg:

    docker exec -ti alq-web bash -c 'PHP_IDE_CONFIG="serverName=alq.test" drush -l rodeos alq-import-emailees emailees.json'
    
See above debug for weird idekey problem.
    
## Backups

Go into the CPANEL hosting and check the backups -> Acronis section.

