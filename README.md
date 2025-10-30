# DealDuck - Automated Steam Market Trading Platform

Полнофункциональная платформа автоматизированной торговли на Steam Market с использованием Elysia.js (backend) и Next.js (frontend).

## Технологии

### Backend
- **Elysia.js** - быстрый TypeScript-фреймворк для Bun
- **PostgreSQL + Prisma** - база данных и ORM
- **Steam OpenID** - авторизация через Steam
- **Steam Web API** - получение данных профиля и инвентаря
- **JWT** - токены для сессий
- **TypeScript** - полная типизация

### Frontend
- **Next.js 14 (App Router)** - React фреймворк
- **shadcn/ui** - современные UI компоненты на базе Radix UI
- **TypeScript** - типизация
- **Zustand** - управление состоянием с persist
- **Zod** - валидация данных
- **Framer Motion** - анимации
- **Recharts** - графики и визуализация данных
- **Lucide React** - иконки
- **Tailwind CSS** - стилизация

## Основные возможности

### Авторизация
- ✅ Steam OpenID авторизация
- ✅ JWT токены для сессий
- ✅ Автоматическое обновление данных профиля

### Управление подпиской
- ✅ Интеграция с Boosty API
- ✅ История подписок по датам
- ✅ Автоматическое продление
- ✅ Разные тарифные планы (Basic, Premium, Enterprise)

### Инвентарь
- ✅ Просмотр всех предметов из Steam
- ✅ Актуальные цены с торговой площадки
- ✅ Графики истории цен (30 дней)
- ✅ Процент изменения цены
- ✅ Синхронизация с Steam API

### Стратегии торговли
- ✅ Создание торговых стратегий
- ✅ Выбор игры (CS2, Dota 2, и др.)
- ✅ Выбор предметов для торговли
- ✅ Настройка условий покупки/продажи
- ✅ Настройка задержек
- ✅ Установка максимальной цены покупки
- ✅ Установка минимальной цены продажи
- ✅ Запуск/остановка стратегий
- ✅ Редактирование стратегий
- ✅ Статистика (профит, покупки, продажи, успешность)
- ✅ История транзакций

### Настройки
- ✅ Информация об аккаунте
- ✅ Настройка Steam Guard для автоподтверждения
- ✅ Управление подпиской

### UI/UX
- ✅ Адаптивный дизайн
- ✅ Dark mode support
- ✅ Анимации с Framer Motion
- ✅ Левое меню навигации
- ✅ Красивые графики и статистика

## Установка

### Требования
- Bun или Node.js 18+
- PostgreSQL 14+
- Steam API Key

### Backend Setup
\`\`\`bash
cd server
npm install
cp .env.example .env
# Edit .env with your settings
npm run db:push
npm run dev
\`\`\`

### Frontend Setup
\`\`\`bash
cd client
npm install
cp .env.example .env.local
npm run dev
\`\`\`

## API Эндпоинты

### Auth
- GET /api/auth/steam
- GET /api/auth/steam/callback
- GET /api/auth/me
- POST /api/auth/logout

### Subscriptions
- GET /api/subscriptions
- GET /api/subscriptions/current
- POST /api/subscriptions/sync

### Inventory
- GET /api/inventory
- GET /api/inventory/:itemId/price-history

### Strategies
- GET /api/strategies
- POST /api/strategies
- PUT /api/strategies/:id
- DELETE /api/strategies/:id
- POST /api/strategies/:id/toggle
- GET /api/strategies/:id/transactions

## Лицензия

MIT
