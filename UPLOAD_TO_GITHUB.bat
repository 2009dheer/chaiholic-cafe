@echo off
echo =========================================
echo UPLOADING CHAIHOLIC WEBSITE TO GITHUB
echo =========================================
echo.

git init
git add .
git commit -m "Ultimate Website Release"
git branch -M main

git remote add origin https://github.com/2009dheer/chaiholic-website.git
git push -u origin main --force

echo.
echo =========================================
echo UPLOAD COMPLETE! 
echo =========================================
pause
