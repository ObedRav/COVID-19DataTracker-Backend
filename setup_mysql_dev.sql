-- prepares a MySQL server for the project
CREATE DATABASE IF NOT EXISTS covid19datatracker_dev_db;
CREATE USER IF NOT EXISTS 'user'@'localhost' IDENTIFIED BY 'user_dev_pwd';
GRANT ALL PRIVILEGES ON `covid19datatracker_dev_db`.* TO 'user'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'user'@'localhost';
FLUSH PRIVILEGES;
