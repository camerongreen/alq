# Docker build for alq.org.au Drupal
# Use 268 prefix for ports
FROM php:5.6-apache

# install libraries and utils needed
RUN apt-get update \
    && apt-get install -y vim git curl libpng12-dev libcurl3-dev mysql-client composer drush \
    && docker-php-ext-install pdo pdo_mysql json gd curl \
    && pecl install xdebug

# Allow php config to be overridden
COPY config/php.ini /usr/local/etc/php/
