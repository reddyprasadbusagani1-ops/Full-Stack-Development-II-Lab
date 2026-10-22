-- 7c. SQL SUBQUERIES (a query inside another query)
-- Requires database.sql to have been run (table fsd2_lab.students).
USE fsd2_lab;

-- 1. Scalar subquery: returns ONE value. Students with cgpa above the overall average.
SELECT name, department, cgpa
FROM students
WHERE cgpa > (SELECT AVG(cgpa) FROM students);

-- 2. Subquery with IN: returns a LIST. Students in departments that have 2 or more students.
SELECT name, department
FROM students
WHERE department IN (
  SELECT department FROM students GROUP BY department HAVING COUNT(*) >= 2
);

-- 3. Correlated subquery: runs once per outer row.
--    Top scorer(s) in each department (the inner query uses the outer row's department).
SELECT s.name, s.department, s.cgpa
FROM students s
WHERE s.cgpa = (SELECT MAX(x.cgpa) FROM students x WHERE x.department = s.department);

-- 4. Subquery in FROM (derived table): average cgpa per department, then compare each student.
SELECT s.name, s.department, s.cgpa, d.avg_cgpa
FROM students s
JOIN (SELECT department, AVG(cgpa) AS avg_cgpa FROM students GROUP BY department) AS d
  ON s.department = d.department
WHERE s.cgpa > d.avg_cgpa;

-- 5. EXISTS: students for whom some other student in the same department is in a higher year.
SELECT s.name, s.department, s.year
FROM students s
WHERE EXISTS (
  SELECT 1 FROM students o WHERE o.department = s.department AND o.year > s.year
);

-- 6. Subquery in the SELECT list: show how far each student is from the overall average.
SELECT name, cgpa,
       ROUND(cgpa - (SELECT AVG(cgpa) FROM students), 2) AS difference_from_average
FROM students
WHERE cgpa IS NOT NULL
ORDER BY difference_from_average DESC;
