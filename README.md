# DealDuck - Steam Authentication Platform

Полнофункциональная система авторизации через Steam с использованием Elysia.js (backend) и Next.js (frontend).

## Технологии

### Backend
- **Elysia.js** - быстрый TypeScript-фреймворк для Bun
- **Steam OpenID** - авторизация через Steam
- **JWT** - токены для сессий
- **TypeScript** - типизация

### Frontend
- **Next.js 14** - React фреймворк
- **TypeScript** - типизация
- **Zustand** - управление состоянием
- **Zod** - валидация данных
- **Lucide React** - иконки
- **Tailwind CSS** - стилизация

## Структура проекта

```
dealduck/
├── server/          # Backend (Elysia.js)
│   ├── src/
│   │   ├── app.ts          # Главный файл приложения
│   │   ├── types.ts        # TypeScript типы
│   │   ├── store.ts        # In-memory хранилище
│   │   ├── steam.ts        # Steam API утилиты
│   │   ├── config.ts       # Конфигурация
│   │   └── utils.ts        # Вспомогательные функции
│   └── package.json
│
└── client/          # Frontend (Next.js)
    ├── src/
    │   ├── app/            # Next.js страницы (App Router)
    │   ├── components/     # React компоненты
    │   ├── hooks/          # API хуки
    │   ├── store/          # Zustand stores
    │   ├── types/          # TypeScript типы + Zod схемы
    │   └── lib/            # Утилиты и конфигурация
    └── package.json
```

## Установка и настройка

### Получение Steam API Key

1. Перейдите на https://steamcommunity.com/dev/apikey
2. Войдите через Steam
3. Заполните форму и получите ваш API ключ
4. Сохраните ключ для настройки

### Backend

1. Перейдите в папку server:
```bash
cd server
```

2. Установите Bun (если не установлен):
```bash
curl -fsSL https://bun.sh/install | bash
```

3. Установите зависимости:
```bash
bun install
```

4. Создайте файл `.env` на основе `.env.example`:
```bash
cp .env.example .env
```

5. Отредактируйте `.env` и добавьте ваш Steam API Key:
```env
PORT=3001
JWT_SECRET=your-secret-key-change-in-production
STEAM_API_KEY=YOUR_STEAM_API_KEY_HERE
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:3001
```

6. Запустите сервер:
```bash
bun run dev
```

Сервер будет доступен на http://localhost:3001

### Frontend

1. Перейдите в папку client:
```bash
cd client
```

2. Установите зависимости:
```bash
npm install
# или
yarn install
# или
pnpm install
```

3. Создайте файл `.env.local`:
```bash
cp .env.example .env.local
```

4. Запустите приложение:
```bash
npm run dev
# или
yarn dev
# или
pnpm dev
```

Приложение будет доступно на http://localhost:3000

## API Эндпоинты

### Авторизация

#### `GET /api/auth/steam`
Получить URL для авторизации через Steam

**Response:**
```json
{
  "url": "https://steamcommunity.com/openid/login?..."
}
```

#### `GET /api/auth/steam/callback`
Callback эндпоинт для Steam OpenID (автоматически вызывается Steam)

**Query Parameters:**
- Steam OpenID параметры

**Redirect:**
- Перенаправляет на frontend с токеном: `http://localhost:3000/auth/callback?token=...`

#### `GET /api/auth/me`
Получить информацию о текущем пользователе

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "user": {
    "id": "string",
    "steamId": "string",
    "username": "string",
    "avatar": "string",
    "profileUrl": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

#### `POST /api/auth/logout`
Выйти из системы

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true
}
```

## Frontend компоненты

### `SteamLoginButton`
Кнопка для входа через Steam с иконкой из Lucide React

### `UserProfile`
Отображает профиль пользователя с:
- Аватаром Steam
- Именем пользователя
- Ссылкой на профиль Steam
- Кнопкой выхода

## Hooks

### `useAuth()`
Хук для работы с API авторизации:
- `getSteamAuthUrl()` - получить URL для входа
- `getMe(token)` - получить данные пользователя
- `logout(token)` - выйти из системы

## Store (Zustand)

### `useAuthStore`
Глобальное состояние авторизации:
- `user` - данные пользователя
- `token` - токен сессии
- `isAuthenticated` - статус авторизации
- `setAuth(user, token)` - установить данные авторизации
- `clearAuth()` - очистить данные

## Валидация (Zod)

Все API ответы валидируются с помощью Zod схем:
- `UserSchema` - схема пользователя
- `AuthResponseSchema` - схема ответа авторизации
- `MeResponseSchema` - схема ответа /me

## Разработка

### Backend
```bash
cd server
bun run dev  # Запуск с hot reload
```

### Frontend
```bash
cd client
npm run dev  # Запуск с hot reload
```

## Production

### Backend
```bash
cd server
bun run start
```

### Frontend
```bash
cd client
npm run build
npm run start
```

## Особенности

- ✅ Полная типизация TypeScript
- ✅ Steam OpenID авторизация
- ✅ JWT токены для сессий
- ✅ Валидация данных с Zod
- ✅ Управление состоянием с Zustand
- ✅ Responsive дизайн с Tailwind CSS
- ✅ Иконки Lucide React
- ✅ In-memory хранилище (легко заменить на БД)
- ✅ CORS настроен
- ✅ Dark mode support

## Дальнейшее развитие

- [ ] Подключить PostgreSQL/MongoDB для хранения данных
- [ ] Добавить middleware для защиты роутов
- [ ] Реализовать refresh tokens
- [ ] Добавить rate limiting
- [ ] Добавить логирование
- [ ] Unit тесты
- [ ] Docker контейнеризация

## Лицензия

MIT
