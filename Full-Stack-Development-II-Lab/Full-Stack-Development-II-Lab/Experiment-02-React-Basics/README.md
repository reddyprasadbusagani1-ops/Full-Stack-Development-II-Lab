# Experiment 2 - Basics of React.js

## Aim
To build React counters using class and functional components, handle button clicks, use conditional rendering, and display text with template literals.

## Required Software / Tools
Windows 11, Node.js LTS (v18+), npm, VS Code, a browser. Internet is needed for `npm install`.

## Theory (Simple Language)
- **Component**: A reusable piece of UI. A *class component* extends `React.Component` and keeps data in `this.state`; a *functional component* is a function that uses hooks such as `useState`.
- **State**: Data that changes over time. When state changes, React re-renders the component.
- **Event handling**: `onClick={function}` (use camelCase; pass a function, do not call it).
- **Conditional rendering**: Show different UI using `if`, the ternary `a ? b : c`, or `a && b`.
- **Template literal**: `` `Hello ${name}` `` builds strings with embedded values.
- **Vite**: A fast modern tool that serves and builds React apps (replacement for the deprecated Create React App).

## Algorithm / Procedure
1. Create the Vite project files (provided).
2. Write `ClassCounter`, `FunctionCounter`, `ButtonClickDemo`, `ConditionalRender`, `TemplateLiteralDemo`.
3. Import and render them all in `App.jsx`.
4. Install dependencies and start the dev server.

## Files and Source Code
```
Experiment-02-React-Basics/
  package.json  vite.config.js  index.html
  src/main.jsx  src/App.jsx  src/styles.css
  src/components/ClassCounter.jsx        (2a)
  src/components/FunctionCounter.jsx     (2b)
  src/components/ButtonClickDemo.jsx     (2c)
  src/components/ConditionalRender.jsx   (2d)
  src/components/TemplateLiteralDemo.jsx (2e)
```
All complete code is in these files.

## Execution Steps (Command Prompt)
```cmd
cd Experiment-02-React-Basics
npm install
npm run dev
```
Open the URL shown (normally `http://localhost:5173`). Press `Ctrl+C` to stop. Optional production build: `npm run build`.

### Alternative: Syllabus workflow with Create React App
The syllabus uses `npx create-react-app myapp`. Create React App is deprecated and may not work with current React/Node versions. If your lab requires it:
```cmd
npx create-react-app myapp
cd myapp
npm start
```
Then copy the `src/components` folder and `App.jsx` content into `myapp\src` (rename `.jsx` to `.js` if needed, and import `styles.css` in `index.js`). Vite is recommended otherwise.

## Expected Browser Result (illustrative)
- Two counters start at 0; **+1** increases, **-1** decreases, **Reset** returns to 0.
- Click buttons show messages such as `Hello, Student! This click passed an argument.`
- **Login** toggles to **Logout** and the greeting changes.
- Typing name "Asha" and marks 75 shows `Asha scored 75 marks and earned grade A.`

## Result
Class and functional counters, click handling, conditional rendering, and template literals were implemented in React.

## Common Errors and Troubleshooting
| Problem | Fix |
|---------|-----|
| `npm run dev` -> "missing script" | You are in the wrong folder; `cd` into this experiment. |
| `vite is not recognized` | Run `npm install` first. |
| Blank page | Open the browser console (F12) and read the error; check import file names and case. |
| Port 5173 busy | Vite picks the next port automatically; use the URL it prints. |
| PowerShell blocks npm | Use Command Prompt, or run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`. |
