FROM ubuntu:22.04

LABEL maintainer="Jiayi Chen"

ARG DOCKER_UID
ARG DOCKER_GID
# environment variables
ENV TZ=UTC
ENV NODE_VERSION=16.13.0
ENV NVM_DIR=/home/ubuntu/nvm

# replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# timezone
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# add user ubuntu with same uid and gid
RUN groupadd -g $DOCKER_GID ubuntu
RUN useradd ubuntu -u $DOCKER_UID -g $DOCKER_GID --create-home -m -s /bin/bash
WORKDIR /home/ubuntu

# helper command
RUN echo "alias listening='lsof -i -P -n | grep LISTEN'" >> /home/ubuntu/.bashrc
ENV PATH="/var/www/html/chat/docker/web/:$PATH"


# update the repository sources list
RUN apt update

# install dependencies
# Install PHP 8.1
RUN apt install software-properties-common apt-transport-https -y 
RUN apt install inetutils-ping bind9-host ncat nano unzip -y 
RUN apt install git curl wget lsof -y
RUN apt purge apache2 -y
RUN add-apt-repository ppa:ondrej/php -y 
RUN apt install php8.1 -y
RUN apt install php8.1-{cli,common,curl,zip,gd,mysql,xml,mbstring,intl,fpm,redis,dev} -y
RUN apt -y autoclean

# Install composer
RUN php -r "readfile('http://getcomposer.org/installer');" | php -- --install-dir=/usr/bin/ --filename=composer


# debug tools
RUN apt install nmap -y
RUN apt install nmap redis -y

# permissions and logs
RUN mkdir -p /run/php/
RUN mkdir -p /var/log/php-fpm/

RUN chown -R ubuntu:ubuntu /var/log/
RUN chmod -R 774 /var/log/

RUN chown -R ubuntu:ubuntu /run/php/
RUN chmod -R 774 /run/php/


# install nvm
USER ubuntu
RUN mkdir -p $NVM_DIR
RUN git clone https://github.com/nvm-sh/nvm.git "$NVM_DIR" \
    && cd "$NVM_DIR" \
    && git checkout `git describe --abbrev=0 --tags --match "v[0-9]*" $(git rev-list --tags --max-count=1)` \
    && \. "$NVM_DIR/nvm.sh"

# install node and npm
RUN source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

# add node and npm to path so the commands are available
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

RUN npm install -g laravel-echo-server pm2

USER root
# Install Xdebug
RUN apt install php8.1-xdebug iproute2 -y
# RUN pecl install xdebug

# enable xdebug
# RUN echo > /etc/php/8.1/cli/php.ini
# RUN echo 'zend_extension=xdebug.so' >> /etc/php/8.1/cli/php.ini \
#     && echo 'xdebug.mode=debug' >> /etc/php/8.1/cli/php.ini \
#     && echo 'xdebug.start_with_request=yes' >> /etc/php/8.1/cli/php.ini \
#     && echo 'xdebug.client_host=host.docker.internal' >> /etc/php/8.1/cli/php.ini \
#     && echo 'xdebug.client_port=9003' >> /etc/php/8.1/cli/php.ini \
#     && echo 'xdebug.log=/tmp/xdebug.log' >> /etc/php/8.1/cli/php.ini
RUN echo 'xdebug.mode=debug' >> /etc/php/8.1/cli/php.ini \
    && echo 'xdebug.client_host=localhost' >> /etc/php/8.1/cli/php.ini \
    && echo 'xdebug.client_port=9003' >> /etc/php/8.1/cli/php.ini \
    && echo 'xdebug.start_with_request=yes' >> /etc/php/8.1/cli/php.ini


RUN apt install redis -y

USER ubuntu
WORKDIR /var/www/html/chat

