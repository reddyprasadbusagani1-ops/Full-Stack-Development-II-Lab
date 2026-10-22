# Experiment 7 - MySQL

## Aim
To create a database and table, run INSERT/UPDATE queries and subqueries, use MySQL Workbench, and provide `database.sql` for the Experiment 6 Express API.

## Required Software / Tools
Windows 11, **MySQL Community Server 8.x** (MySQL Installer), MySQL Command Line Client, MySQL Workbench.

## Theory (Simple Language)
- **Database**: container of tables. **Table**: rows (records) and columns (fields).
- **Primary key**: unique id of each row. **UNIQUE**: no two rows may share the value (email).
- **DDL**: `CREATE`. **DML**: `INSERT`, `UPDATE`, `SELECT`.
- **Subquery**: a `SELECT` inside another statement (in `WHERE`, `FROM`, or the select list). *Scalar* returns one value, *IN* returns a list, *correlated* depends on the outer row, *EXISTS* checks if rows exist.

**Names used everywhere:** database `fsd2_lab`, table `students` (columns `id, name, email, department, year, cgpa, created_at`).

## Install and Start MySQL
1. Download **MySQL Installer** from https://dev.mysql.com/downloads/installer/ and choose *Custom/Full* to include **Server, Workbench, Shell/Command Line Client**.
2. Set a **root password** when asked and remember it (never put it in Git).
3. Check the service: press `Win + R` -> `services.msc` -> `MySQL80` must be **Running** (right-click -> Start if not).
4. Optional: add `C:\Program Files\MySQL\MySQL Server 8.0\bin` to PATH (the version folder may differ) so `mysql` works in Command Prompt.

## 7a. Create Database and Table via Command Line Client
Start menu -> **MySQL 8.0 Command Line Client** -> enter your root password. Or in Command Prompt: `mysql -u root -p`.
```sql
CREATE DATABASE fsd2_lab;
SHOW DATABASES;
USE fsd2_lab;
CREATE TABLE students (id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) NOT NULL, email VARCHAR(150) NOT NULL UNIQUE, department VARCHAR(50) NOT NULL, year TINYINT UNSIGNED NOT NULL, cgpa DECIMAL(4,2) NULL, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);
SHOW TABLES;
DESCRIBE students;
```
The same with constraints is in `sql/01_cli_create_database_and_table.sql`. If you created the plain table above, `DROP TABLE students;` before running `database.sql`.

## 7b. CREATE, INSERT, UPDATE
File: `sql/02_create_insert_update.sql`. Run inside the client:
```sql
source C:/path/to/Full-Stack-Development-II-Lab/Experiment-07-MySQL/sql/02_create_insert_update.sql;
```
(Use forward slashes in `source`.) Key statements:
```sql
INSERT INTO students (name, email, department, year, cgpa) VALUES ('Neha','neha@example.com','AI&DS',1,8.30);
UPDATE students SET cgpa = 8.60 WHERE email = 'neha@example.com';
SELECT * FROM students;
```
**Always** use `WHERE` with `UPDATE`, otherwise all rows change.

## 7c. Subqueries
File: `sql/03_subqueries.sql` (run `database.sql` first). It contains six examples with comments:
1. Scalar: `WHERE cgpa > (SELECT AVG(cgpa) FROM students)`
2. `IN`: departments having 2+ students
3. Correlated: top scorer in each department
4. Derived table in `FROM`: department averages
5. `EXISTS`: a higher-year student exists in the same department
6. Subquery in the select list: difference from average

## 7d. MySQL Workbench Script
1. Open Workbench -> click your **Local instance** connection -> enter password.
2. **File -> Open SQL Script** -> `workbench/fsd2_lab_workbench.sql`.
3. Click the lightning bolt (**Execute**). View results in the grid at the bottom; refresh the **Schemas** panel to see `fsd2_lab`.

## 7e. Project Database Directory: `database/database.sql`
Initializes the database and table used by Experiment 6e.
```cmd
cd Experiment-07-MySQL
mysql -u root -p < database\database.sql
```
Or inside the client: `source C:/path/to/Experiment-07-MySQL/database/database.sql;`
Optional, safer than using root in your app (choose your own password; do not commit it):
```sql
CREATE USER 'fsd2_user'@'localhost' IDENTIFIED BY 'CHOOSE_A_STRONG_PASSWORD';
GRANT SELECT, INSERT, UPDATE, DELETE ON fsd2_lab.* TO 'fsd2_user'@'localhost';
FLUSH PRIVILEGES;
```
Put these values in `Experiment-06-Node-Express\.env` (`DB_USER`, `DB_PASSWORD`).

## Sample Verification Output (illustrative)
```
mysql> SELECT COUNT(*) AS total_students FROM students;
+----------------+
| total_students |
+----------------+
|              7 |
+----------------+
```
After `database.sql`, the average cgpa of non-null rows is about 8.04, so the first subquery lists students such as Asha, Sita, Meena (exact rows depend on your data).

## Result
A database and table were created, records inserted and updated, subqueries executed, and a reusable `database.sql` prepared for the Express API.

## Common Errors and Troubleshooting
| Error | Fix |
|-------|-----|
| `'mysql' is not recognized` | Add MySQL `bin` folder to PATH or use the Command Line Client. |
| `ERROR 1045 Access denied` | Wrong password/user. |
| `ERROR 2003 Can't connect` | Start the `MySQL80` service. |
| `ERROR 1062 Duplicate entry` | Email already exists (UNIQUE); use a different one or `INSERT IGNORE`. |
| `ERROR 1064 syntax error` | Check commas, quotes, and semicolons. |
| `ERROR 3819 Check constraint violated` | `year` must be 1-4 and `cgpa` 0-10. |
| `ERROR 1046 No database selected` | Run `USE fsd2_lab;` |
