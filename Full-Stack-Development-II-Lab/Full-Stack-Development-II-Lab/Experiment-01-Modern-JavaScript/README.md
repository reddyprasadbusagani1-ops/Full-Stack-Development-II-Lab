# Experiment 1 - Modern JavaScript and DOM

## Aim
To link an external JavaScript file to HTML, select elements with DOM selectors, handle events, and demonstrate functions and key ES6 features.

## Required Software / Tools
- Windows 11, Google Chrome or Edge, VS Code (optional: Live Server extension). No build tool or Node.js needed.

## Theory (Simple Language)
- **DOM**: The browser turns your HTML into a tree of objects. JavaScript can find and change those objects.
- **Selectors**: `getElementById("id")` (one element by id), `querySelector(".css")` (first match), `querySelectorAll(".css")` (all matches).
- **Events**: Things that happen on the page (click, mouseover). `addEventListener("click", fn)` runs `fn` when it happens.
- **Functions**: *Declaration* (`function f(){}` - hoisted), *expression* (`const f = function(){}`), *arrow* (`const f = () => {}`).
- **ES6**: Spread `...arr` expands items; rest `...args` collects items; destructuring pulls values out of arrays/objects; template literals use backticks and `${}`; *type coercion* is automatic type conversion; *hoisting* moves declarations to the top of their scope.

## Algorithm / Procedure
1. Create `index.html`, `style.css`, `script.js` in one folder.
2. Link CSS in `<head>` and JS before `</body>` using `<script src="script.js"></script>`.
3. In `script.js`, select elements and attach listeners.
4. Open `index.html` in a browser and click each button.

## Files and Source Code
| File | Purpose |
|------|---------|
| `index.html` | Page structure with buttons and output area |
| `style.css` | Responsive styling |
| `script.js` | All JavaScript demos (1a-1e + ES6) |

Complete code is in the files of this folder.

## Execution Steps
1. Open File Explorer -> `Experiment-01-Modern-JavaScript`.
2. Double-click `index.html` (or right-click -> Open with Chrome).
3. Press **F12** -> Console tab to see logged messages.
4. Click: *Highlight all fruits*, *Click me*, *Run function demos*, *Run ES6 demos*. Hover over the dashed box.

## Expected Output (illustrative, not captured)
- Card 1a shows "Success: script.js is linked and running."
- *Click me* three times -> `Button clicked 3 time(s). Event type: click`
- *Run function demos* -> `add(2, 3) = 5`, `multiply(2, 3) = 6`, `square(4) = 16`
- *Run ES6 demos* -> includes `"5" + 1 = 51`, `"5" - 1 = 4`, `0 == "0" -> true`, `Number("abc") = NaN`, `let before declaration -> ReferenceError`, `others: ["blue","yellow"]`.

## Result
External JS was linked, DOM elements were selected, events handled, and function types and ES6 features were demonstrated.

## Common Errors and Troubleshooting
| Problem | Fix |
|---------|-----|
| Nothing happens on click | Check Console for errors; make sure `script.js` is in the same folder and the name matches exactly. |
| `Cannot read properties of null` | The script ran before the element existed or the id is misspelled. Keep the `<script>` at the end of `<body>`. |
| Page unstyled | Check the `<link rel="stylesheet" href="style.css">` path. |
