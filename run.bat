@echo off
title VitaCare AI - Portal Khoa Bác Sĩ
color 0B
echo ===================================================
echo             VITACARE AI DEVELOPMENT PORTAL
echo ===================================================
echo [INFO] Dang kiem tra moi truong chay...
echo.

:: Path check
cd /d "%~dp0"

:: Check if node_modules folder exists
if not exist "node_modules\" (
    echo [WARNING] Khong tim thay thu muc node_modules.
    echo [ACTION] Dang tu dong chay "npm install" de cai dat cac thu vien phu thuoc...
    call npm install
    if %errorlevel% neq 0 (
        color 0C
        echo.
        echo [ERROR] Cai dat thu vien that bai! Vui long kiem tra lai Node.js va Internet.
        pause
        exit /b %errorlevel%
    )
    echo [SUCCESS] Cai dat thu vien thanh cong!
    echo.
)

:: Auto-open browser after 2.5 seconds
echo [INFO] Dang chuan bi khoi chay trinh duyet truc tiep den Cong Bac si...
start "" http://localhost:5173/doctor

:: Start Vite dev server
echo [INFO] Dang khoi chay Vite Development Server...
echo.
call npm run dev

pause
