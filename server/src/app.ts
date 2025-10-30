import { Elysia } from 'elysia';
import { jwt } from '@elysiajs/jwt';
import { cors } from '@elysiajs/cors';
import { cookie } from '@elysiajs/cookie';
import { config } from './config';
import { authRoutes } from './routes/auth';
import { subscriptionRoutes } from './routes/subscriptions';
import { inventoryRoutes } from './routes/inventory';
import { strategyRoutes } from './routes/strategies';

const app = new Elysia()
  .use(cors({
    origin: config.frontendUrl,
    credentials: true,
  }))
  .use(cookie())
  .use(jwt({
    name: 'jwt',
    secret: config.jwtSecret,
  }))

  // Health check
  .get('/health', () => ({ status: 'ok' }))

  // Routes
  .use(authRoutes)
  .use(subscriptionRoutes)
  .use(inventoryRoutes)
  .use(strategyRoutes)

  .listen(config.port);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);

export default app;
