-- 7b. CREATE, INSERT and UPDATE queries (database fsd2_lab, table students)
CREATE DATABASE IF NOT EXISTS fsd2_lab;
USE fsd2_lab;

-- CREATE TABLE (skipped if it already exists)
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

-- INSERT one record (INSERT IGNORE skips it if the email already exists)
INSERT IGNORE INTO students (name, email, department, year, cgpa)
VALUES ('Neha', 'neha@example.com', 'AI&DS', 1, 8.30);

-- INSERT several records at once
INSERT IGNORE INTO students (name, email, department, year, cgpa) VALUES
  ('Vamsi', 'vamsi@example.com', 'CSE', 2, 7.90),
  ('Divya', 'divya@example.com', 'ECE', 3, 8.10);

SELECT * FROM students;                                   -- verify inserts

-- UPDATE a single record by primary key
UPDATE students SET cgpa = 8.60 WHERE email = 'neha@example.com';

-- UPDATE several columns
UPDATE students SET department = 'AI&DS', year = 3 WHERE email = 'vamsi@example.com';

-- UPDATE many rows: give everyone with missing cgpa a placeholder of 0.00
-- (ALWAYS use WHERE; without it every row changes!)
UPDATE students SET cgpa = 0.00 WHERE cgpa IS NULL;

SELECT id, name, department, year, cgpa FROM students ORDER BY id;   -- verify updates
