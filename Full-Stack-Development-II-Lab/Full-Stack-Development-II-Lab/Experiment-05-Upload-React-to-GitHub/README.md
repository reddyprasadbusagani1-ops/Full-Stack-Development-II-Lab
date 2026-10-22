# Experiment 5 - Upload a React Project to GitHub

## Aim
To create a React app, push it to GitHub, understand `.gitignore`, create feature branches, and open Pull Requests.

## Required Software / Tools
Windows 11, Node.js LTS, npm, Git (configured as in Experiment 4), GitHub account, VS Code.

## Theory (Simple Language)
- A React project has hundreds of downloaded packages in `node_modules` (often 100+ MB). They can be recreated by `npm install` from `package.json`, so they are **never uploaded**.
- `.gitignore` lists files Git must skip: `node_modules/`, build output (`build/` or `dist/`), and `.env` (secrets).
- A **Pull Request (PR)** asks to merge one branch into another and lets others review the code first.

## 5a. Create a React App
**Syllabus workflow**
```cmd
npx create-react-app myapp
cd myapp
npm start
```
> Create React App (CRA) is deprecated and may fail or install outdated dependencies on new setups. If it fails, use **Vite** (modern alternative):
```cmd
npm create vite@latest myapp -- --template react
cd myapp
npm install
npm run dev
```
CRA runs on `http://localhost:3000`; Vite on `http://localhost:5173`.

## 5b. Initialize Git, Commit, Add Remote, Push
1. On GitHub create an **empty** repo named `myapp` (no README, no .gitignore, no license).
2. In `myapp`:
```cmd
git init -b main
git status
git add .
git commit -m "Initial React app"
git remote add origin https://github.com/<your-username>/myapp.git
git push -u origin main
```
CRA creates `.git` itself when Git is installed; if so, skip `git init` and just run `git branch -M main`.

## 5c. .gitignore and node_modules
CRA and Vite already create a `.gitignore`. Check that it has `node_modules` and `.env`. Example: see `example.gitignore` in this folder (also shown below).
```
node_modules/
build/
dist/
.env
.env.local
npm-debug.log*
.vscode/
```
If `node_modules` was committed by mistake:
```cmd
git rm -r --cached node_modules
git commit -m "Stop tracking node_modules"
```
Anyone who clones the repo runs `npm install` to get the packages back.

## 5d. Create feature/navbar and feature/form
```cmd
git checkout main
git checkout -b feature/navbar
```
Create `src/Navbar.jsx` (in CRA use `.js`):
```jsx
function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "16px", padding: "10px", background: "#1f3a93" }}>
      <a style={{ color: "#fff" }} href="#home">Home</a>
      <a style={{ color: "#fff" }} href="#about">About</a>
      <a style={{ color: "#fff" }} href="#contact">Contact</a>
    </nav>
  );
}
export default Navbar;
```
Import and render `<Navbar />` at the top of `App`. Then:
```cmd
git add .
git commit -m "Add navbar component"
git checkout main
git checkout -b feature/form
```
Create `src/ContactForm.jsx`:
```jsx
import { useState } from "react";

function ContactForm() {
  const [name, setName] = useState("");
  return (
    <form onSubmit={(e) => { e.preventDefault(); alert(`Thanks, ${name}!`); }}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
      <button type="submit">Send</button>
    </form>
  );
}
export default ContactForm;
```
Render `<ContactForm />` in `App`, then `git add .` and `git commit -m "Add contact form"`.

> Both branches edit `App`, so the second PR may show a merge conflict. Resolve it as in Experiment 4.

## 5e. Push Branches and Create Pull Requests
```cmd
git push -u origin feature/navbar
git push -u origin feature/form
```
On GitHub:
1. Open the repo -> yellow banner **Compare & pull request** (or **Pull requests -> New pull request**).
2. Base: `main`, Compare: `feature/navbar`. Write a title and description (what/why/how to test).
3. **Create pull request**. Review **Files changed**.
4. **Merge pull request** -> **Confirm merge**. Repeat for `feature/form`.
5. Update your computer:
```cmd
git checkout main
git pull origin main
```

## Expected Result (illustrative)
- GitHub shows source files and **no** `node_modules` folder.
- Two PRs are listed and merged; `main` contains both features.

## Result
A React project was uploaded to GitHub, protected by `.gitignore`, and extended through feature branches and Pull Requests.

## Common Errors and Troubleshooting
| Problem | Fix |
|---------|-----|
| `npx create-react-app` fails/hangs | Use the Vite commands above. |
| `src refspec main does not match any` | Commit first, and make sure the branch is `main` (`git branch -M main`). |
| Push rejected (`fetch first`) | The GitHub repo is not empty: `git pull origin main --allow-unrelated-histories`, resolve, push. |
| File over 100 MB error | `node_modules` was committed; remove it from history/tracking and add `.gitignore`. |
| PR shows conflicts | Merge `main` into your branch locally, fix markers, commit, push. |
