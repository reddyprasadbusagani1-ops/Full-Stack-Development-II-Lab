# Full Stack Development-II Lab

**Course:** FULL STACK DEVELOPMENT-II (Skill Enhancement Course)
**Regulation:** JNTUA R23  **Degree:** B.Tech Artificial Intelligence & Data Science
**L T P C:** 0 1 2 2
**Author:** Busagani Reddy Prasad (GitHub: `reddyprasadbusagani1-ops`)
**License:** MIT

A beginner-friendly lab manual with runnable code for all 8 experiments. Primary environment: **Windows 11**.

> **Testing status:** The files were generated without access to a Windows machine, an internet connection, or a MySQL server. Plain JavaScript syntax was checked with `node --check` only. `npm install`, the React apps, Express servers, and MySQL scripts have **not been run**. Please run each experiment locally and fix any version-specific issues. Output shown in READMEs is *illustrative expected output*, not captured output.

## Experiment Index

| No. | Folder | Topic |
|-----|--------|-------|
| 1 | `Experiment-01-Modern-JavaScript` | Modern JavaScript, ES6, DOM, events |
| 2 | `Experiment-02-React-Basics` | Class/functional counters, click handling, conditional rendering |
| 3 | `Experiment-03-React-Concepts` | useState, useEffect + fetch, props, forms, map() |
| 4 | `Experiment-04-Git-GitHub` | Git install/config, commands, branching, merge conflict |
| 5 | `Experiment-05-Upload-React-to-GitHub` | create-react-app/Vite, .gitignore, branches, Pull Requests |
| 6 | `Experiment-06-Node-Express` | Express routes, CRUD API, MySQL with mysql2 |
| 7 | `Experiment-07-MySQL` | MySQL CLI, queries, subqueries, Workbench, `database.sql` |
| 8 | `Experiment-08-GitHub-Team-Collaboration` | Issues, branches, PRs, code review |

## Prerequisites (Windows 11)

| Tool | Download | Check with |
|------|----------|-----------|
| VS Code | https://code.visualstudio.com | open it |
| Node.js LTS (v18+; v20+ recommended) | https://nodejs.org | `node -v` and `npm -v` |
| Git for Windows | https://git-scm.com/download/win | `git --version` |
| MySQL Community Server + Workbench | https://dev.mysql.com/downloads/installer/ | `mysql --version` |
| A GitHub account | https://github.com | - |

## Quick Start

```cmd
git clone https://github.com/<your-username>/Full-Stack-Development-II-Lab.git
cd Full-Stack-Development-II-Lab
```

- **Exp 1:** double-click `Experiment-01-Modern-JavaScript\index.html`.
- **Exp 2 / 3:** `cd Experiment-02-React-Basics` (or `-03-`), then `npm install`, then `npm run dev`. Open the URL printed (usually http://localhost:5173).
- **Exp 6:** `cd Experiment-06-Node-Express`, `npm install`, then run a script such as `npm run start:a`.
- **Exp 7:** see the README inside the folder.
- **Exp 4, 5, 8:** follow the step-by-step READMEs (Git/GitHub practice).

## Project Structure

```
Full-Stack-Development-II-Lab/
  README.md  LICENSE  .gitignore
  Experiment-01-Modern-JavaScript/   index.html style.css script.js README.md
  Experiment-02-React-Basics/        package.json index.html vite.config.js src/ README.md
  Experiment-03-React-Concepts/      package.json index.html vite.config.js src/ README.md
  Experiment-04-Git-GitHub/          README.md practice/conflict-demo.bat
  Experiment-05-Upload-React-to-GitHub/ README.md example.gitignore
  Experiment-06-Node-Express/        package.json .env.example src/ public/ tests/ README.md
  Experiment-07-MySQL/               database/database.sql sql/ workbench/ README.md
  Experiment-08-GitHub-Team-Collaboration/ README.md templates/
```

## Port Map (Experiment 6)

| Script | Port |
|--------|------|
| `start:a` Hello World | 3001 |
| `start:b` Website | 3002 |
| `start:c` Console Hello | 3003 |
| `start:d` CRUD (in memory) | 3004 |
| `start:e` CRUD + MySQL | 3005 |

Vite apps (Exp 2, 3) use 5173 by default. Run one server at a time, or they will not conflict anyway because ports differ.

## Common Troubleshooting

| Problem | Fix |
|---------|-----|
| `'node' is not recognized` | Reinstall Node.js, then close and reopen Command Prompt. |
| `npm run dev` fails | Run `npm install` first in that experiment folder. |
| `EADDRINUSE` (port in use) | Stop the other server (Ctrl+C) or change `PORT` in the file. |
| `'git' is not recognized` | Reinstall Git for Windows and reopen the terminal. |
| `ER_ACCESS_DENIED_ERROR` | Check `DB_USER`/`DB_PASSWORD` in your `.env`. |

## Upload This Project to GitHub

1. On GitHub: **New repository** -> name `Full-Stack-Development-II-Lab` -> do **not** add README/license (they already exist).
2. In Command Prompt inside the project folder:

```cmd
git init -b main
git add .
git commit -m "Add Full Stack Development-II lab project"
git remote add origin https://github.com/reddyprasadbusagani1-ops/Full-Stack-Development-II-Lab.git
git push -u origin main
```

3. Sign in through the browser window (Git Credential Manager). Never paste tokens into code or README files.

## Security Rules

Never commit `node_modules`, `dist`, `.env`, passwords, API keys, or personal access tokens. Only `.env.example` (placeholders) is allowed.
