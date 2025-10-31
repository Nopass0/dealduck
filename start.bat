@echo off
REM Скрипт для одновременного запуска фронтенда и бэкенда на Windows

echo ========================================
echo   Запуск DealDuck
echo ========================================

REM Проверка существования директорий
if not exist "server" (
    echo Ошибка: директория server не найдена
    exit /b 1
)

if not exist "client" (
    echo Ошибка: директория client не найдена
    exit /b 1
)

REM Запуск бэкенда в новом окне
echo [BACKEND] Запуск бэкенд сервера...
start "DealDuck Backend" cmd /k "cd server && bun run dev"

REM Небольшая задержка
timeout /t 2 /nobreak >nul

REM Запуск фронтенда в новом окне
echo [FRONTEND] Запуск фронтенд сервера...
start "DealDuck Frontend" cmd /k "cd client && npm run dev"

echo.
echo ========================================
echo   Оба сервера запущены!
echo ========================================
echo Фронтенд: http://localhost:3000
echo Бэкенд:   http://localhost:3001
echo.
echo Закройте окна терминалов для остановки серверов
pause
