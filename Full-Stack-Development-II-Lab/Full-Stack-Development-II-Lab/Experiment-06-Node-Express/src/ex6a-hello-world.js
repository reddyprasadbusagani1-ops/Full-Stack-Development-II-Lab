// 6a. Express "Hello World" route.  Run: npm run start:a   Open: http://localhost:3001
const express = require("express");
const app = express();
const PORT = 3001;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Experiment 6a running at http://localhost:${PORT}`);
});
