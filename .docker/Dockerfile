# Docker build for alq.org.au
# Use 269 prefix for ports
FROM php:7.2-apache

ENV APACHE_DOCUMENT_ROOT /var/www/html/public_html
ENV PATH "${PATH}:/var/www/html/vendor/bin"

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# install libraries and utils needed
# add mbstring next time this is updated
RUN apt update \
    && apt install -y \
    curl \
    firefox-esr \
    ftp \
    git \
    libcurl3-dev \
    libfreetype6-dev \
    libgd3 \
    libjpeg62-turbo-dev \
    libnss3-dev \
    libpng-dev \
    libssl-dev \
    mysql-client \
    unzip \
    vim \
    zip

# Install node.
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt install -y nodejs

# Install chrome
RUN curl -sL https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -o /tmp/google-chrome.deb \
    && dpkg -i /tmp/google-chrome.deb \
    && apt --fix-broken install

RUN docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include \
    && docker-php-ext-install curl pdo pdo_mysql json ftp gd mbstring

RUN pecl install xdebug \
    && a2enmod rewrite

RUN export PATH=${PATH}:/var/www/html/vendor/bin

USER root
