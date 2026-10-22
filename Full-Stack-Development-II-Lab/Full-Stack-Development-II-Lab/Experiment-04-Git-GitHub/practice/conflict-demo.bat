@echo off
REM Creates a practice repository that ends in a MERGE CONFLICT (expected).
REM Run from Command Prompt:  conflict-demo.bat
cd /d "%~dp0"
if exist conflict-practice rmdir /s /q conflict-practice
mkdir conflict-practice
cd conflict-practice
git init -b main
git config user.name "Practice User"
git config user.email "practice@example.com"
echo Notes file> notes.txt
echo Welcome message: Hello> greeting.txt
git add .
git commit -m "Initial commit"

git checkout -b feature/greeting
echo Welcome message: Hello from the feature branch> greeting.txt
git commit -am "Change greeting on feature branch"

git checkout main
echo Welcome message: Hello from main> greeting.txt
git commit -am "Change greeting on main"

echo.
echo ===== Merging now. A CONFLICT is expected below =====
git merge feature/greeting
echo.
echo Open conflict-practice\greeting.txt, resolve the markers, then run:
echo   git add greeting.txt
echo   git commit -m "Resolve merge conflict in greeting.txt"
