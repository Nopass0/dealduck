#!/bin/bash

# Скрипт для одновременного запуска фронтенда и бэкенда

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Запуск DealDuck${NC}"
echo -e "${GREEN}========================================${NC}"

# Функция для очистки процессов при завершении
cleanup() {
    echo -e "\n${YELLOW}Остановка серверов...${NC}"
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    wait $BACKEND_PID $FRONTEND_PID 2>/dev/null
    echo -e "${RED}Серверы остановлены${NC}"
    exit 0
}

# Установка ловушки для Ctrl+C
trap cleanup SIGINT SIGTERM

# Проверка существования директорий
if [ ! -d "server" ]; then
    echo -e "${RED}Ошибка: директория server не найдена${NC}"
    exit 1
fi

if [ ! -d "client" ]; then
    echo -e "${RED}Ошибка: директория client не найдена${NC}"
    exit 1
fi

# Запуск бэкенда
echo -e "${BLUE}[BACKEND]${NC} Запуск бэкенд сервера..."
cd server
bun run dev > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..
echo -e "${GREEN}[BACKEND]${NC} Запущен (PID: $BACKEND_PID)"

# Небольшая задержка для запуска бэкенда
sleep 2

# Запуск фронтенда
echo -e "${BLUE}[FRONTEND]${NC} Запуск фронтенд сервера..."
cd client
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..
echo -e "${GREEN}[FRONTEND]${NC} Запущен (PID: $FRONTEND_PID)"

echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}  Оба сервера запущены!${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "${YELLOW}Фронтенд:${NC} http://localhost:3000"
echo -e "${YELLOW}Бэкенд:${NC}   http://localhost:3001"
echo -e "\n${YELLOW}Логи сохраняются в:${NC}"
echo -e "  - backend.log"
echo -e "  - frontend.log"
echo -e "\n${YELLOW}Нажмите Ctrl+C для остановки серверов${NC}"

# Ожидание завершения процессов
wait $BACKEND_PID $FRONTEND_PID
