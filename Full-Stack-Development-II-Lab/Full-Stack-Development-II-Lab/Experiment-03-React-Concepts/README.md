# Experiment 3 - Important React Concepts

## Aim
To use `useState`, `useEffect` (API fetch), props, controlled forms with validation, and `map()` for list rendering.

## Required Software / Tools
Windows 11, Node.js LTS (v18+), npm, VS Code, browser, internet (for npm and the demo API).

## Theory (Simple Language)
- **useState**: Remembers a value between renders; calling the setter re-renders.
- **useEffect**: Runs code after rendering, e.g. fetching data. The dependency array `[]` / `[x]` controls when it runs. The returned function is cleanup.
- **Props**: Read-only inputs passed from parent to child, like function arguments. Functions can be passed too, so a child can notify its parent.
- **Controlled input**: The input's `value` comes from state and `onChange` updates state.
- **map() and keys**: `array.map(item => <li key={item.id}>...)` renders lists. A key must be stable and unique, so use IDs rather than array index.

## Algorithm / Procedure
1. `Counter` - `useState`.
2. `UserList` - `fetch` inside `useEffect`, with loading/error states.
3. `StudentDashboard` (parent) passes data/callback to `StudentCard` (child).
4. `RegistrationForm` validates before saving.
5. `FruitList` uses `map()` with `key={fruit.id}`.

## Files and Source Code
```
package.json  vite.config.js  index.html
src/main.jsx  src/App.jsx  src/styles.css
src/components/Counter.jsx            (3a)
src/components/UserList.jsx           (3b) API: https://jsonplaceholder.typicode.com/users
src/components/StudentDashboard.jsx   (3c parent)
src/components/StudentCard.jsx        (3c child)
src/components/RegistrationForm.jsx   (3d)
src/components/FruitList.jsx          (3e)
```

## Execution Steps
```cmd
cd Experiment-03-React-Concepts
npm install
npm run dev
```
Open `http://localhost:5173`.

## Expected Browser Result (illustrative)
- Counter changes by the chosen step.
- User list first shows "Loading users...", then 10 users. Turn off internet and click **Reload** to see an error message.
- Clicking **Select** on a card updates "Selected student".
- Submitting an empty form shows red validation messages; a valid form adds an item under "Registered".
- Moving the price slider filters fruits.

## Result
The key React hooks and patterns were implemented in one responsive application.

## Common Errors and Troubleshooting
| Problem | Fix |
|---------|-----|
| "Each child in a list should have a unique key" | Add `key={item.id}` to the outermost element inside `map()`. |
| Input cannot be typed in | A controlled input needs both `value` and `onChange`. |
| `Failed to fetch` | Check internet/firewall; the demo API is third-party and may be temporarily unavailable. |
| Effect runs twice in development | Expected in React StrictMode; it does not happen in production builds. |
