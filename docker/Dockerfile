# Docker build for alq.org.au
# Use 269 prefix for ports
FROM php:7.2-apache

ENV APACHE_DOCUMENT_ROOT /var/www/html/public_html
ENV PATH "${PATH}:/var/www/html/vendor/bin"

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# install libraries and utils needed
# add mbstring next time this is updated
RUN apt-get update \
    && apt-get install -y vim ftp git curl libfreetype6-dev libgd3 libjpeg62-turbo-dev libpng-dev libcurl3-dev mysql-client libssl-dev zip unzip

RUN docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include \
    && docker-php-ext-install curl pdo pdo_mysql json ftp gd mbstring

RUN pecl install xdebug \
    && a2enmod rewrite

USER root

# Allow php config to be overridden
COPY config/php.ini /usr/local/etc/php/
