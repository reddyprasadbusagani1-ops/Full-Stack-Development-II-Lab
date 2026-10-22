# Experiment 4 - Git and GitHub

## Aim
To install and configure Git, create a GitHub repository, use core Git commands, work with branches and merging, and resolve a merge conflict.

## Required Software / Tools
Windows 11, Git for Windows (includes Git Credential Manager), Command Prompt, a GitHub account, VS Code (optional).

## Theory (Simple Language)
- **Git** is a version-control tool on your computer; **GitHub** is a website that stores Git repositories online.
- **Repository (repo)**: a project folder tracked by Git.
- **Commit**: a saved snapshot with a message. **Branch**: an independent line of work. **Merge**: combines branches. **Remote**: the online copy (usually named `origin`).
- **Merge conflict**: two branches changed the same lines; Git asks you to choose.
- **Authentication**: GitHub no longer accepts account passwords for Git over HTTPS. Git Credential Manager opens a browser sign-in and stores a token securely. Never type tokens, passwords, or keys into project files.

## 4a. Install Git and Configure
1. Download from https://git-scm.com/download/win and install (defaults are fine; keep "Git Credential Manager" selected).
2. Open a **new** Command Prompt:
```cmd
git --version
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main
git config --global --list
```
Use the same email as your GitHub account (or the GitHub no-reply email shown in GitHub Settings -> Emails).

## 4b. Create a GitHub Repository and Authenticate
1. GitHub -> **+** -> **New repository** -> name `git-practice` -> Public/Private -> *tick* "Add a README" is optional (skip it for an empty repo) -> **Create repository**.
2. Copy the HTTPS URL: `https://github.com/<your-username>/git-practice.git`.
3. On your first `git push` a browser window opens. Choose **Sign in with your browser** and authorize. Git Credential Manager saves the login.
4. Never put access tokens or passwords in code, README files, or commit messages. If you accidentally push one, revoke it in GitHub -> Settings -> Developer settings immediately.

## 4c. Core Commands
```cmd
mkdir git-practice
cd git-practice
git init
echo # Git Practice> README.md
git status
git add README.md
git commit -m "Add README"
git branch -M main
git remote add origin https://github.com/<your-username>/git-practice.git
git remote -v
git push -u origin main
```

| Command | What it does |
|---------|--------------|
| `git init` | Starts tracking the current folder (creates hidden `.git`). |
| `git status` | Shows changed, staged, and untracked files. |
| `git add <file>` / `git add .` | Stages changes for the next commit. |
| `git commit -m "msg"` | Saves staged changes as a snapshot. |
| `git branch` | Lists branches (`git branch name` creates one). |
| `git branch -M main` | Renames the current branch to `main`. |
| `git remote add origin <url>` | Links the local repo to GitHub. |
| `git push -u origin main` | Uploads `main` and remembers it for later `git push`. |
| `git log --oneline` | Short commit history. |
| `git pull` | Downloads and merges remote changes. |

## 4d. Branch, Change, Merge, Push
```cmd
git checkout -b feature/about-page
echo About this project> about.txt
git add about.txt
git commit -m "Add about page"
git checkout main
git merge feature/about-page
git push origin main
git branch -d feature/about-page
```
(`git switch -c feature/about-page` and `git switch main` are modern equivalents.) Optional: push the branch first with `git push -u origin feature/about-page`.

## 4e. Practice a Merge Conflict
### Automatic setup
```cmd
cd Experiment-04-Git-GitHub\practice
conflict-demo.bat
```
It creates `conflict-practice\` where `main` and `feature/greeting` both edit `greeting.txt`.

### Manual steps (same idea)
1. Create `greeting.txt`, commit on `main`.
2. `git checkout -b feature/greeting`, change line 1, commit.
3. `git checkout main`, change the same line differently, commit.
4. `git merge feature/greeting` -> Git reports `CONFLICT (content)`.

### Resolve
Open `greeting.txt`; you will see:
```
<<<<<<< HEAD
Welcome message: Hello from main
=======
Welcome message: Hello from the feature branch
>>>>>>> feature/greeting
```
Edit the file to the final text you want and **delete** the three marker lines, then:
```cmd
git status
git add greeting.txt
git commit -m "Resolve merge conflict in greeting.txt"
git log --oneline --graph
```
To cancel a merge: `git merge --abort`.

## Sample Output (illustrative)
```
Auto-merging greeting.txt
CONFLICT (content): Merge conflict in greeting.txt
Automatic merge failed; fix conflicts and then commit the result.
```

## Result
Git was installed and configured, a repository was created and pushed, branches were merged, and a merge conflict was resolved.

## Common Errors and Troubleshooting
| Error | Fix |
|-------|-----|
| `fatal: not a git repository` | Run `git init` or `cd` into the repo folder. |
| `Author identity unknown` | Set `user.name` and `user.email` (4a). |
| `remote origin already exists` | `git remote set-url origin <url>` |
| `failed to push some refs` / `fetch first` | `git pull --rebase origin main`, then push again. |
| `Authentication failed` | Retry and sign in via the browser; update Git for Windows; remove old entries in Windows Credential Manager -> Windows Credentials -> `git:https://github.com`. |
| `refusing to merge unrelated histories` | Only if you created a README on GitHub and also locally: `git pull origin main --allow-unrelated-histories`. |
