// 6e. CRUD API connected to MySQL with mysql2. Database: fsd2_lab, table: students
// (created by Experiment-07-MySQL/database/database.sql)
// Run: npm run start:e   Base URL: http://localhost:3005
const express = require("express");
const pool = require("./db");
const { validateStudent, parseId } = require("./validate");

const app = express();
const PORT = 3005;
app.use(express.json());

// Wrap async handlers so errors go to the error middleware
const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// Health check: confirms the database connection works
app.get("/api/health", wrap(async (req, res) => {
  await pool.query("SELECT 1");
  res.json({ status: "ok", database: "connected" });
}));

// READ all
app.get("/api/students", wrap(async (req, res) => {
  const [rows] = await pool.query("SELECT id, name, email, department, year, cgpa FROM students ORDER BY id");
  res.json(rows);
}));

// READ one
app.get("/api/students/:id", wrap(async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ error: "id must be a positive whole number" });
  const [rows] = await pool.execute("SELECT id, name, email, department, year, cgpa FROM students WHERE id = ?", [id]);
  if (rows.length === 0) return res.status(404).json({ error: "Student not found" });
  res.json(rows[0]);
}));

// CREATE
app.post("/api/students", wrap(async (req, res) => {
  const { errors, value } = validateStudent(req.body);
  if (errors.length) return res.status(400).json({ errors });
  const [result] = await pool.execute(
    "INSERT INTO students (name, email, department, year, cgpa) VALUES (?, ?, ?, ?, ?)",
    [value.name, value.email, value.department, value.year, value.cgpa ?? null]
  );
  const [rows] = await pool.execute("SELECT id, name, email, department, year, cgpa FROM students WHERE id = ?", [result.insertId]);
  res.status(201).json(rows[0]);
}));

// UPDATE (only the provided fields)
app.put("/api/students/:id", wrap(async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ error: "id must be a positive whole number" });
  const { errors, value } = validateStudent(req.body, { partial: true });
  if (errors.length) return res.status(400).json({ errors });

  // Column names come from our own validated object keys (never from the user directly)
  const columns = Object.keys(value);
  const setClause = columns.map((c) => `${c} = ?`).join(", ");
  const [result] = await pool.execute(`UPDATE students SET ${setClause} WHERE id = ?`, [...columns.map((c) => value[c]), id]);
  if (result.affectedRows === 0) return res.status(404).json({ error: "Student not found" });

  const [rows] = await pool.execute("SELECT id, name, email, department, year, cgpa FROM students WHERE id = ?", [id]);
  res.json(rows[0]);
}));

// DELETE
app.delete("/api/students/:id", wrap(async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ error: "id must be a positive whole number" });
  const [result] = await pool.execute("DELETE FROM students WHERE id = ?", [id]);
  if (result.affectedRows === 0) return res.status(404).json({ error: "Student not found" });
  res.status(204).send();
}));

app.use((req, res) => res.status(404).json({ error: "Route not found" }));

// Central error handler: logs details on the server, returns a safe message to the client
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") return res.status(400).json({ error: "Invalid JSON in request body" });
  if (err.code === "ER_DUP_ENTRY") return res.status(409).json({ error: "A student with this email already exists" });
  console.error("Server error:", err.code || err.message);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => console.log(`Experiment 6e (MySQL CRUD) running at http://localhost:${PORT}`));
