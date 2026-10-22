# Experiment 6 - Node.js and Express.js

## Aim
To build Express servers: Hello World, a multi-route website, a page that prints Hello World in the browser console, a CRUD REST API, and a MySQL-connected API using `mysql2`.

## Required Software / Tools
Windows 11, Node.js LTS (v18+), npm, VS Code, a browser, optionally the VS Code **REST Client** extension, and MySQL Server (only for 6e; set up in Experiment 7).

## Theory (Simple Language)
- **Node.js** runs JavaScript outside the browser. **Express** is a small library for building web servers.
- A **route** = HTTP method + URL path + handler: `app.get("/", (req, res) => ...)`.
- **REST CRUD**: `POST` create (201), `GET` read (200), `PUT` update (200), `DELETE` remove (204). Errors: 400 bad input, 404 not found, 409 duplicate, 500 server error.
- **Middleware**: functions that run before routes, e.g. `express.json()` reads JSON bodies.
- **Parameterized queries**: `WHERE id = ?` with a values array stops SQL injection.
- **mysql2**: the MySQL driver; `mysql2/promise` works with `async/await`.

## Port Map (run ONE example at a time, or each in its own terminal)
| Example | Command | URL |
|---------|---------|-----|
| 6a Hello World | `npm run start:a` | http://localhost:3001 |
| 6b Website | `npm run start:b` | http://localhost:3002 |
| 6c Console Hello | `npm run start:c` | http://localhost:3003 |
| 6d CRUD in memory | `npm run start:d` | http://localhost:3004/api/students |
| 6e CRUD + MySQL | `npm run start:e` | http://localhost:3005/api/students |

## Files
```
package.json  .env.example  .gitignore
src/ex6a-hello-world.js   src/ex6b-website.js   src/ex6c-console-hello.js
src/ex6d-crud-memory.js   src/ex6e-mysql-api.js
src/db.js (MySQL pool)    src/validate.js (shared validation)
public/console/index.html public/console/hello.js
tests/api-tests.http
```

## Setup
```cmd
cd Experiment-06-Node-Express
npm install
```

## Execution and Testing

### 6a - Hello World
`npm run start:a`, open http://localhost:3001 -> page shows `Hello World`. Stop with `Ctrl+C`.

### 6b - Website
`npm run start:b`; visit `/`, `/about`, `/courses`, `/contact`, `/students/1`, `/api/info`. `/students/abc` -> 400. Unknown path -> 404 page.

### 6c - Hello World in browser console
`npm run start:c`, open http://localhost:3003, press **F12 -> Console**. Expected: `Hello World`.

### 6d - CRUD API (in memory)
`npm run start:d`. Test in the browser (GET only) or with a REST client. Using `curl.exe` in **Command Prompt** (Windows 11 includes it):
```cmd
curl.exe http://localhost:3004/api/students
curl.exe -X POST http://localhost:3004/api/students -H "Content-Type: application/json" -d "{\"name\":\"Sita\",\"email\":\"sita@example.com\",\"department\":\"AI&DS\",\"year\":1,\"cgpa\":9.1}"
curl.exe -X PUT http://localhost:3004/api/students/1 -H "Content-Type: application/json" -d "{\"year\":3}"
curl.exe -i -X DELETE http://localhost:3004/api/students/2
```
Or open `tests/api-tests.http` in VS Code with the REST Client extension and click **Send Request**.

### 6e - CRUD API with MySQL
1. Complete **Experiment 7** first so database `fsd2_lab` and table `students` exist (`Experiment-07-MySQL/database/database.sql`).
2. Create your private settings file:
```cmd
copy .env.example .env
notepad .env
```
Fill `DB_USER` and `DB_PASSWORD` with your own MySQL account. `.env` is ignored by Git - never commit it.
3. `npm run start:e`, then check http://localhost:3005/api/health.
4. Use the same requests as 6d but with port **3005**.

## Expected Output (illustrative, not captured)
`GET /api/students`:
```json
[{"id":1,"name":"Asha","email":"asha@example.com","department":"AI&DS","year":2,"cgpa":8.5}]
```
`POST` valid -> **201** with the new student. `POST` with `{"name":"A"}` -> **400** `{"errors":["email is required", ...]}`. `GET /api/students/999` -> **404** `{"error":"Student not found"}`. `DELETE` -> **204** (no body). With MySQL, `cgpa` may be returned as a string such as `"8.50"` (mysql2 returns DECIMAL as text).

## Testing status
`src/validate.js` logic and JavaScript syntax were checked with Node. The Express servers, `npm install`, and MySQL connection were **not run** in the generation environment; please test locally.

## Result
Express routes, a validated CRUD API, and a MySQL-backed API were created using async/await and parameterized queries.

## Common Errors and Troubleshooting
| Error | Fix |
|-------|-----|
| `Cannot find module 'express'` | Run `npm install` in this folder. |
| `EADDRINUSE :::3001` | Another server uses the port; stop it (`Ctrl+C`) or find it: `netstat -ano \| findstr :3001`. |
| `ER_ACCESS_DENIED_ERROR` | Wrong `DB_USER`/`DB_PASSWORD` in `.env`. |
| `ER_BAD_DB_ERROR` / `ER_NO_SUCH_TABLE` | Run `database.sql` (Experiment 7). |
| `ECONNREFUSED 127.0.0.1:3306` | MySQL service is not running: open **Services** -> start `MySQL80`. |
| `ER_NOT_SUPPORTED_AUTH_MODE` | Use a MySQL 8 user with `caching_sha2_password` and a current mysql2 version. |
| 400 "Invalid JSON" | In Command Prompt escape quotes as `\"` or use the REST Client file. |
