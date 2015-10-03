# Docker build for alq.org.au
# Use 268 prefix for ports
FROM php:5.6-apache

# install libraries and utils needed
RUN apt-get update \
    && apt-get install -y vim git curl libpng12-dev libcurl3-dev mysql-client drush unzip \
    && docker-php-ext-install mysql pdo pdo_mysql json gd curl \
    && pecl install xdebug \
    && a2enmod rewrite

# Allow php config to be overridden
COPY config/php.ini /usr/local/etc/php/
