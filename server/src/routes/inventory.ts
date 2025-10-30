import { Elysia } from 'elysia';
import { prisma } from '../db';

export const inventoryRoutes = new Elysia({ prefix: '/api/inventory' })
  // Get user's inventory
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

    const inventory = await prisma.inventoryItem.findMany({
      where: { userId: session.userId },
      include: {
        item: {
          include: {
            priceHistory: {
              orderBy: { timestamp: 'desc' },
              take: 1,
            },
          },
        },
      },
    });

    return { inventory };
  })

  // Get price history for an item
  .get('/:itemId/price-history', async ({ params, query, headers, set }) => {
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

    const days = parseInt((query as any).days) || 30;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const priceHistory = await prisma.priceHistory.findMany({
      where: {
        itemId: params.itemId,
        timestamp: {
          gte: startDate,
        },
      },
      orderBy: { timestamp: 'asc' },
    });

    return { priceHistory };
  });
