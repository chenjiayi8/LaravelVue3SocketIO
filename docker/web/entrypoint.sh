#!/bin/sh

php-fpm8.1 -y /usr/local/etc/php-fpm.conf
bash -c "tail -f /dev/null"
