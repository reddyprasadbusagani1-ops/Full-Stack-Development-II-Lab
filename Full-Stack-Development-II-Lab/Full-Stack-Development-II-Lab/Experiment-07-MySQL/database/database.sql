-- ============================================================
-- Full Stack Development-II : database initialisation script
-- Database : fsd2_lab      Table : students
-- Used by  : Experiment-06-Node-Express (src/ex6e-mysql-api.js)
-- Run with : mysql -u root -p < database\database.sql
-- Safe to run more than once (uses IF NOT EXISTS / INSERT IGNORE).
-- ============================================================

CREATE DATABASE IF NOT EXISTS fsd2_lab
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

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

-- Sample records (duplicates by email are skipped)
INSERT IGNORE INTO students (name, email, department, year, cgpa) VALUES
  ('Asha',   'asha@example.com',   'AI&DS', 2, 8.50),
  ('Ravi',   'ravi@example.com',   'CSE',   3, 7.20),
  ('Sita',   'sita@example.com',   'AI&DS', 1, 9.10),
  ('Kiran',  'kiran@example.com',  'ECE',   4, 6.80),
  ('Meena',  'meena@example.com',  'CSE',   2, 8.90),
  ('Arjun',  'arjun@example.com',  'AI&DS', 3, 7.75),
  ('Lakshmi','lakshmi@example.com','ECE',   2, NULL);

-- Verification
SELECT COUNT(*) AS total_students FROM students;
SELECT id, name, email, department, year, cgpa FROM students ORDER BY id;
