// 6b. A small website with multiple routes.  Run: npm run start:b   Open: http://localhost:3002
const express = require("express");
const app = express();
const PORT = 3002;

const nav = `
  <nav>
    <a href="/">Home</a> | <a href="/about">About</a> | <a href="/courses">Courses</a> |
    <a href="/contact">Contact</a> | <a href="/students/1">Student 1</a>
  </nav>`;

function page(title, body) {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<style>
  body{font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:16px}
  nav{background:#1f3a93;padding:10px;border-radius:6px} nav a{color:#fff;margin:0 4px}
</style></head>
<body>${nav}<h1>${title}</h1>${body}</body></html>`;
}

const courses = ["HTML/CSS/JavaScript", "React.js", "Node.js and Express.js", "MySQL"];

app.get("/", (req, res) => res.send(page("Home", "<p>Welcome to the Full Stack Development-II lab website.</p>")));
app.get("/about", (req, res) => res.send(page("About", "<p>This site is built with Express.js routes.</p>")));
app.get("/courses", (req, res) => {
  const items = courses.map((c) => `<li>${c}</li>`).join("");
  res.send(page("Courses", `<ul>${items}</ul>`));
});
app.get("/contact", (req, res) => res.send(page("Contact", "<p>Email: student@example.com</p>")));

// Route parameter: /students/5
app.get("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).send(page("Bad Request", "<p>Student id must be a positive whole number.</p>"));
  }
  res.send(page(`Student ${id}`, `<p>Showing details for student number ${id}.</p>`));
});

// JSON route
app.get("/api/info", (req, res) => res.json({ site: "FSD-II Lab", routes: ["/", "/about", "/courses", "/contact"] }));

// 404 for unknown routes
app.use((req, res) => res.status(404).send(page("404 - Not Found", "<p>This page does not exist.</p>")));

app.listen(PORT, () => console.log(`Experiment 6b running at http://localhost:${PORT}`));
