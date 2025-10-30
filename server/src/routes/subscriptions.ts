import { Elysia } from 'elysia';
import { prisma } from '../db';
import axios from 'axios';
import { config } from '../config';

async function getBoostySubscription(userId: string) {
  // Здесь будет интеграция с Boosty API
  // Пока возвращаем заглушку
  try {
    // const response = await axios.get(`${process.env.BOOSTY_API_URL}/subscriptions`, {
    //   headers: {
    //     Authorization: `Bearer ${process.env.BOOSTY_ACCESS_TOKEN}`,
    //   },
    // });
    return null;
  } catch (error) {
    console.error('Boosty API error:', error);
    return null;
  }
}

export const subscriptionRoutes = new Elysia({ prefix: '/api/subscriptions' })
  // Get user's subscriptions
  .get('/', async ({ headers, set }) => {
    const authHeader = headers['authorization'];
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      set.status = 401;
      return { error: 'No token provided' };
    }

    const session = await prisma.session.findUnique({
      where: { token },
    });

    if (!session || session.expiresAt < new Date()) {
      set.status = 401;
      return { error: 'Invalid or expired token' };
    }

    const subscriptions = await prisma.subscription.findMany({
      where: { userId: session.userId },
      orderBy: { startDate: 'desc' },
    });

    return { subscriptions };
  })

  // Get current subscription status
  .get('/current', async ({ headers, set }) => {
    const authHeader = headers['authorization'];
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      set.status = 401;
      return { error: 'No token provided' };
    }

    const session = await prisma.session.findUnique({
      where: { token },
    });

    if (!session || session.expiresAt < new Date()) {
      set.status = 401;
      return { error: 'Invalid or expired token' };
    }

    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: session.userId,
        status: 'active',
        endDate: {
          gte: new Date(),
        },
      },
      orderBy: { startDate: 'desc' },
    });

    return { subscription };
  })

  // Sync with Boosty
  .post('/sync', async ({ headers, set }) => {
    const authHeader = headers['authorization'];
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      set.status = 401;
      return { error: 'No token provided' };
    }

    const session = await prisma.session.findUnique({
      where: { token },
    });

    if (!session || session.expiresAt < new Date()) {
      set.status = 401;
      return { error: 'Invalid or expired token' };
    }

    // Sync with Boosty API
    const boostyData = await getBoostySubscription(session.userId);

    // Update subscription based on Boosty data
    // Implementation depends on Boosty API structure

    return { success: true };
  });
