-- ============================================================
-- MySQL Workbench script : Full Stack Development-II (Experiment 7d)
-- Open in Workbench: File > Open SQL Script, then click the lightning bolt
-- (Execute). To run one statement: put the cursor in it and press Ctrl+Enter.
-- ============================================================

CREATE DATABASE IF NOT EXISTS fsd2_lab CHARACTER SET utf8mb4;
USE fsd2_lab;

CREATE TABLE IF NOT EXISTS students (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  department VARCHAR(50) NOT NULL,
  year TINYINT UNSIGNED NOT NULL,
  cgpa DECIMAL(4,2) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_students_email (email),
  CONSTRAINT chk_students_year CHECK (year BETWEEN 1 AND 4),
  CONSTRAINT chk_students_cgpa CHECK (cgpa IS NULL OR (cgpa >= 0 AND cgpa <= 10))
) ENGINE=InnoDB;

INSERT IGNORE INTO students (name, email, department, year, cgpa) VALUES
  ('Asha',   'asha@example.com',   'AI&DS', 2, 8.50),
  ('Ravi',   'ravi@example.com',   'CSE',   3, 7.20),
  ('Sita',   'sita@example.com',   'AI&DS', 1, 9.10),
  ('Kiran',  'kiran@example.com',  'ECE',   4, 6.80),
  ('Meena',  'meena@example.com',  'CSE',   2, 8.90);

-- Basic queries
SELECT * FROM students;
SELECT name, cgpa FROM students WHERE department = 'AI&DS' ORDER BY cgpa DESC;
SELECT department, COUNT(*) AS total, ROUND(AVG(cgpa), 2) AS avg_cgpa
FROM students GROUP BY department;

-- Update (use a safe WHERE clause)
UPDATE students SET cgpa = 7.40 WHERE email = 'ravi@example.com';

-- Subquery
SELECT name, cgpa FROM students WHERE cgpa > (SELECT AVG(cgpa) FROM students);

-- Verify
SELECT id, name, email, department, year, cgpa FROM students ORDER BY id;
