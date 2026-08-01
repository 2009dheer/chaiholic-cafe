@echo off
echo ============================================
echo    CHAIHOLIC CAFE - Immersive Website
echo ============================================
echo.
echo Installing dependencies (gsap, lenis, etc.)...
echo.
cd /d "%~dp0"
call npm install
echo.
echo ============================================
echo    Starting Development Server...
echo ============================================
echo.
call npm run dev
pause
