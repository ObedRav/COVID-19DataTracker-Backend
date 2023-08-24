#!/bin/bash
openssl req -nodes -new -x509 -keyout server.key -out server.cert
mkdir SSL_Certificates
mv server* SSL_Certificates
echo "Write your password for the root user in MySQL"
cat setup_mysql_dev.sql | mysql -uroot -p
