# Experiment 8 - Team Collaboration using GitHub

## Aim
To practise a real team workflow for 2-3 students: shared repository, Issues, feature branches, Pull Requests, code review, merging, and README documentation.

## Required Software / Tools
Windows 11, Git, GitHub accounts for every member, VS Code, Command Prompt. (Project code can be the React app from Experiment 5.)

## Theory (Simple Language)
- **Collaborator**: someone with permission to push to the repo.
- **Issue**: a tracked task or bug. **Feature branch**: a separate branch per task so teammates do not overwrite each other.
- **Pull Request (PR)**: proposes merging a branch into `main`; teammates **review** it first.
- **Code review**: reading changes, commenting, and approving or requesting changes.
- **Sync**: keep your local `main` equal to GitHub's `main` with `git pull`.

## Example Team and Tasks
| Member | Role | Issue | Branch |
|--------|------|-------|--------|
| Student A (owner) | Project setup, README | #1 Setup project and README | `feature/setup-readme` |
| Student B | Navbar and layout | #2 Create navbar | `feature/navbar` |
| Student C | Contact form | #3 Create contact form | `feature/contact-form` |

## Procedure

### 1. Create the shared repository (Student A)
GitHub -> **New repository** -> `team-project` -> add README and a `.gitignore` template (**Node**) -> Create.
Invite members: **Settings -> Collaborators -> Add people** -> enter their GitHub usernames. Each member accepts the email/notification invitation.

Optional protection: **Settings -> Branches -> Add branch protection rule** for `main` -> *Require a pull request before merging* and *Require approvals (1)*.

### 2. Divide tasks with Issues
**Issues -> New issue**: write a title, description, acceptance criteria (see `templates/ISSUE_TEMPLATE_task.md`), then set **Assignees** and a **Label**. Optionally add them to a GitHub **Project** board (To do / In progress / Done).

### 3. Everyone clones the repository
```cmd
git clone https://github.com/<owner-username>/team-project.git
cd team-project
```

### 4. Work on a feature branch (example: Student B)
```cmd
git checkout main
git pull origin main
git checkout -b feature/navbar
```
Make your changes, then:
```cmd
git status
git add .
git commit -m "Add navbar component (#2)"
git push -u origin feature/navbar
```

### 5. Open a Pull Request
GitHub -> **Compare & pull request** -> base `main`, compare `feature/navbar` -> fill the template (`templates/PULL_REQUEST_TEMPLATE.md`) -> write `Closes #2` -> **Reviewers**: pick a teammate -> **Create pull request**.

To use the templates in your repo, copy them to `.github/PULL_REQUEST_TEMPLATE.md` and `.github/ISSUE_TEMPLATE/task.md`, and `CONTRIBUTING.md` to the repo root.

### 6. Code review and requested changes
**Reviewer:** PR -> **Files changed** -> hover a line, click **+** to comment -> **Review changes** -> *Comment*, *Approve*, or *Request changes*.
**Author:** fix the code on the same branch and push again; the PR updates automatically:
```cmd
git add .
git commit -m "Address review comments: fix link colours"
git push
```
Reply to each comment and click **Resolve conversation**.

### 7. Merge and synchronize main
After approval click **Merge pull request** -> **Confirm**, then **Delete branch**. Every member then runs:
```cmd
git checkout main
git pull origin main
git branch -d feature/navbar
```
Other members update their in-progress branches:
```cmd
git checkout feature/contact-form
git merge main
```
Resolve any conflicts as in Experiment 4, commit, and push.

### 8. Maintain README.md
Keep the project README updated with: project title and description, team members and roles, tech stack, setup steps (`npm install`, `npm run dev`), folder structure, how to contribute, and license. Update it in the same PR as the feature when behaviour changes.

## Sample Pull Request Checklist
- [ ] Linked issue (`Closes #n`)
- [ ] Branch up to date with `main`, no conflicts
- [ ] App runs: `npm install` and `npm run dev` succeed
- [ ] Manual test done; screenshots added for UI changes
- [ ] No secrets or `node_modules` committed
- [ ] README updated
- [ ] Reviewer approved

## Secure Collaboration Rules
1. Never commit passwords, `.env` files, API keys, or personal access tokens; use `.env.example` with placeholders.
2. Sign in through the browser/Git Credential Manager; never share your GitHub password or token with teammates.
3. Turn on two-factor authentication (2FA) on your GitHub account.
4. Do not push directly to `main`; use PRs and reviews.
5. If a secret is pushed by mistake: **revoke it immediately** (change the password/key), then remove it from the code. Deleting the file in a later commit is not enough because history keeps it.
6. Give collaborators only the access they need and remove them when the project ends.
7. Review all code, including copied snippets, before merging.

## Expected Result (illustrative)
Repository shows 3 closed issues, 3 merged PRs with review comments, branches deleted, and `main` containing all features and an updated README.

## Result
A complete team workflow using Issues, branches, Pull Requests, code review, and merging was practised.

## Common Errors and Troubleshooting
| Problem | Fix |
|---------|-----|
| `Permission denied` / 403 on push | Accept the collaborator invitation; sign in with the correct GitHub account (clear old Windows Credential Manager entries). |
| `Updates were rejected` | `git pull --rebase origin main` then push. |
| PR has conflicts | Merge `main` into your branch locally, resolve markers, commit, push. |
| Pushed to wrong branch | `git checkout -b feature/right-name`, push it, then reset the wrong branch. Ask a teammate if unsure. |
| Cannot merge: review required | Ask a teammate to approve (branch protection is working). |
