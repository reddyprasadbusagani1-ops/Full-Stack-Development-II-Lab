// 6c. Serve an HTML page + JavaScript file that prints Hello World in the BROWSER console.
// Run: npm run start:c   Open: http://localhost:3003  then press F12 -> Console
const express = require("express");
const path = require("path");
const app = express();
const PORT = 3003;

// Serves everything inside public/console (index.html, hello.js)
app.use(express.static(path.join(__dirname, "..", "public", "console")));

app.listen(PORT, () => console.log(`Experiment 6c running at http://localhost:${PORT}`));
