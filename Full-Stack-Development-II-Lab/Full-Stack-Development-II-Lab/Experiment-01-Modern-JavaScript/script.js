// Experiment 1: Modern JavaScript and DOM
"use strict";

const output = document.getElementById("output"); // getElementById
let outputStarted = false;

// Helper: show text in the page and in the browser console.
function log(...parts) {
  const line = parts.map((p) => (typeof p === "object" ? JSON.stringify(p) : String(p))).join(" ");
  console.log(line);
  output.textContent = (outputStarted ? output.textContent + "\n" : "") + line;
  outputStarted = true;
}
function clearOutput() { output.textContent = ""; outputStarted = false; }

// ---------- 1a. External JS linked ----------
document.getElementById("link-status").textContent = "Success: script.js is linked and running.";
console.log("script.js loaded");

// ---------- 1b. DOM selectors ----------
document.getElementById("select-btn").addEventListener("click", () => {
  const title = document.querySelector("#main-title");       // first match (CSS selector)
  const fruits = document.querySelectorAll(".fruit");        // all matches (NodeList)
  const byClass = document.getElementsByClassName("fruit");  // live HTMLCollection
  fruits.forEach((item) => item.classList.toggle("highlight"));
  clearOutput();
  log("Title text:", title.textContent);
  log("querySelectorAll found:", fruits.length, "items");
  log("getElementsByClassName found:", byClass.length, "items");
});

// ---------- 1c. Event listeners (mouse events) ----------
const box = document.getElementById("hover-box");
box.addEventListener("mouseover", () => { box.classList.add("active"); box.textContent = "Mouse is over the box!"; });
box.addEventListener("mouseout", () => { box.classList.remove("active"); box.textContent = "Move your mouse over this box"; });

// ---------- 1d. Button click ----------
let clickCount = 0;
document.getElementById("click-btn").addEventListener("click", function (event) {
  clickCount++;
  document.getElementById("click-output").textContent = `Button clicked ${clickCount} time(s). Event type: ${event.type}`;
});

// ---------- 1e. Functions ----------
function add(a, b) { return a + b; }                 // function declaration (hoisted)
const multiply = function (a, b) { return a * b; };  // function expression
const square = (n) => n * n;                         // arrow function

document.getElementById("func-btn").addEventListener("click", () => {
  clearOutput();
  log("Declaration  add(2, 3) =", add(2, 3));
  log("Expression   multiply(2, 3) =", multiply(2, 3));
  log("Arrow        square(4) =", square(4));
});

// ---------- ES6 features ----------
function sumAll(...numbers) {          // rest parameters collect extra arguments into an array
  return numbers.reduce((total, n) => total + n, 0);
}

function hoistingDemo() {
  const lines = [];
  lines.push("var before assignment: " + typeof hoistedVar + " (value " + hoistedVar + ")");
  var hoistedVar = 10; // declaration is hoisted, assignment is not
  lines.push("function declaration called before it is written: " + laterFunction());
  function laterFunction() { return "works (hoisted)"; }
  try {
    lines.push(String(notYet)); // let is in the Temporal Dead Zone here
    let notYet = 5;
  } catch (e) {
    lines.push("let before declaration -> " + e.name);
  }
  return lines;
}

document.getElementById("es6-btn").addEventListener("click", () => {
  clearOutput();

  log("--- Arrow function ---");
  const double = (x) => x * 2;
  log("double(7) =", double(7));

  log("--- Spread operator ---");
  const a = [1, 2, 3];
  const b = [...a, 4, 5];
  const person = { name: "Asha", age: 20 };
  const student = { ...person, course: "AI&DS" };
  log("Array copy + extend:", b);
  log("Object copy + extend:", student);
  log("Math.max(...b) =", Math.max(...b));

  log("--- Rest parameters ---");
  log("sumAll(1, 2, 3, 4) =", sumAll(1, 2, 3, 4));

  log("--- Type coercion ---");
  log('"5" + 1 =', "5" + 1, "(number becomes string)");
  log('"5" - 1 =', "5" - 1, "(string becomes number)");
  log("true + 1 =", true + 1);
  log('0 == "0" ->', 0 == "0", "| 0 === \"0\" ->", 0 === "0");
  log('Number("abc") =', Number("abc"));

  log("--- Hoisting ---");
  hoistingDemo().forEach((l) => log(l));

  log("--- Template / string literals ---");
  const name = "Ravi", marks = 86;
  log(`${name} scored ${marks} marks. Next year: ${marks + 4}.`);
  log(`Multi-line
  string works too.`);

  log("--- Array destructuring ---");
  const [first, second, ...others] = ["red", "green", "blue", "yellow"];
  log("first:", first, "| second:", second, "| others:", others);
  const [x = 1, y = 2] = [10];
  log("defaults x, y:", x, y);

  log("--- Object destructuring ---");
  const { name: studentName, age, city = "Tirupati" } = { name: "Sita", age: 19 };
  log("name:", studentName, "| age:", age, "| city (default):", city);
});
