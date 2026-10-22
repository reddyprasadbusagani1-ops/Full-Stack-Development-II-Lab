-- 7a. Create a database and table using the MySQL Command Line Client.
-- Type these lines one by one (or run: source C:/path/to/this/file.sql;)

CREATE DATABASE IF NOT EXISTS fsd2_lab;
SHOW DATABASES;
USE fsd2_lab;

CREATE TABLE IF NOT EXISTS students (
  id          INT UNSIGNED     NOT NULL AUTO_INCREMENT,
  name        VARCHAR(100)     NOT NULL,
  email       VARCHAR(150)     NOT NULL,
  department  VARCHAR(50)      NOT NULL,
  year        TINYINT UNSIGNED NOT NULL,
  cgpa        DECIMAL(4,2)     NULL,
  created_at  TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_students_email (email),
  CONSTRAINT chk_students_year CHECK (year BETWEEN 1 AND 4),
  CONSTRAINT chk_students_cgpa CHECK (cgpa IS NULL OR (cgpa >= 0 AND cgpa <= 10))
) ENGINE=InnoDB;

SHOW TABLES;
DESCRIBE students;
