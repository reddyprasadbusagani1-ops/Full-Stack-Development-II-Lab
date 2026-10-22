// 6d. CRUD API (GET, POST, PUT, DELETE) storing data in MEMORY (no database needed).
// Data is lost when the server stops.  Run: npm run start:d   Base URL: http://localhost:3004
const express = require("express");
const { validateStudent, parseId } = require("./validate");

const app = express();
const PORT = 3004;
app.use(express.json()); // parse JSON request bodies

let students = [
  { id: 1, name: "Asha", email: "asha@example.com", department: "AI&DS", year: 2, cgpa: 8.5 },
  { id: 2, name: "Ravi", email: "ravi@example.com", department: "CSE", year: 3, cgpa: 7.2 },
];
let nextId = 3;

// READ all
app.get("/api/students", (req, res) => res.json(students));

// READ one
app.get("/api/students/:id", (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ error: "id must be a positive whole number" });
  const student = students.find((s) => s.id === id);
  if (!student) return res.status(404).json({ error: "Student not found" });
  res.json(student);
});

// CREATE
app.post("/api/students", (req, res) => {
  const { errors, value } = validateStudent(req.body);
  if (errors.length) return res.status(400).json({ errors });
  if (students.some((s) => s.email === value.email)) {
    return res.status(409).json({ error: "A student with this email already exists" });
  }
  const student = { id: nextId++, cgpa: null, ...value };
  students.push(student);
  res.status(201).json(student);
});

// UPDATE (replace fields that are provided)
app.put("/api/students/:id", (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ error: "id must be a positive whole number" });
  const index = students.findIndex((s) => s.id === id);
  if (index === -1) return res.status(404).json({ error: "Student not found" });

  const { errors, value } = validateStudent(req.body, { partial: true });
  if (errors.length) return res.status(400).json({ errors });
  if (value.email && students.some((s) => s.email === value.email && s.id !== id)) {
    return res.status(409).json({ error: "A student with this email already exists" });
  }
  students[index] = { ...students[index], ...value };
  res.json(students[index]);
});

// DELETE
app.delete("/api/students/:id", (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ error: "id must be a positive whole number" });
  const before = students.length;
  students = students.filter((s) => s.id !== id);
  if (students.length === before) return res.status(404).json({ error: "Student not found" });
  res.status(204).send(); // 204 = success, no body
});

// Invalid JSON body and other errors
app.use((req, res) => res.status(404).json({ error: "Route not found" }));
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") return res.status(400).json({ error: "Invalid JSON in request body" });
  console.error(err); // details stay in the server console
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => console.log(`Experiment 6d (in-memory CRUD) running at http://localhost:${PORT}`));
