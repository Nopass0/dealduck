import { Elysia, t } from 'elysia';
import { prisma } from '../db';

export const strategyRoutes = new Elysia({ prefix: '/api/strategies' })
  // Get all strategies for user
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

    const strategies = await prisma.strategy.findMany({
      where: { userId: session.userId },
      include: {
        game: true,
        items: {
          include: {
            item: true,
          },
        },
        stats: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return { strategies };
  })

  // Get single strategy
  .get('/:id', async ({ params, headers, set }) => {
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

    const strategy = await prisma.strategy.findFirst({
      where: {
        id: params.id,
        userId: session.userId,
      },
      include: {
        game: true,
        items: {
          include: {
            item: true,
          },
        },
        stats: true,
      },
    });

    if (!strategy) {
      set.status = 404;
      return { error: 'Strategy not found' };
    }

    return { strategy };
  })

  // Create strategy
  .post('/', async ({ body, headers, set }) => {
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

    const data = body as any;

    const strategy = await prisma.strategy.create({
      data: {
        userId: session.userId,
        gameId: data.gameId,
        name: data.name,
        description: data.description,
        items: {
          create: data.items?.map((item: any) => ({
            itemId: item.itemId,
            action: item.action,
            buyCondition: item.buyCondition,
            sellCondition: item.sellCondition,
            buyDelay: item.buyDelay || 0,
            sellDelay: item.sellDelay || 0,
            maxBuyPrice: item.maxBuyPrice,
            minSellPrice: item.minSellPrice,
            quantity: item.quantity || 1,
          })) || [],
        },
        stats: {
          create: {},
        },
      },
      include: {
        game: true,
        items: {
          include: {
            item: true,
          },
        },
        stats: true,
      },
    });

    return { strategy };
  })

  // Update strategy
  .put('/:id', async ({ params, body, headers, set }) => {
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

    const existing = await prisma.strategy.findFirst({
      where: {
        id: params.id,
        userId: session.userId,
      },
    });

    if (!existing) {
      set.status = 404;
      return { error: 'Strategy not found' };
    }

    const data = body as any;

    // Delete old strategy items
    await prisma.strategyItem.deleteMany({
      where: { strategyId: params.id },
    });

    const strategy = await prisma.strategy.update({
      where: { id: params.id },
      data: {
        name: data.name,
        description: data.description,
        gameId: data.gameId,
        items: {
          create: data.items?.map((item: any) => ({
            itemId: item.itemId,
            action: item.action,
            buyCondition: item.buyCondition,
            sellCondition: item.sellCondition,
            buyDelay: item.buyDelay || 0,
            sellDelay: item.sellDelay || 0,
            maxBuyPrice: item.maxBuyPrice,
            minSellPrice: item.minSellPrice,
            quantity: item.quantity || 1,
          })) || [],
        },
      },
      include: {
        game: true,
        items: {
          include: {
            item: true,
          },
        },
        stats: true,
      },
    });

    return { strategy };
  })

  // Delete strategy
  .delete('/:id', async ({ params, headers, set }) => {
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

    const existing = await prisma.strategy.findFirst({
      where: {
        id: params.id,
        userId: session.userId,
      },
    });

    if (!existing) {
      set.status = 404;
      return { error: 'Strategy not found' };
    }

    await prisma.strategy.delete({
      where: { id: params.id },
    });

    return { success: true };
  })

  // Toggle strategy active status
  .post('/:id/toggle', async ({ params, headers, set }) => {
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

    const existing = await prisma.strategy.findFirst({
      where: {
        id: params.id,
        userId: session.userId,
      },
    });

    if (!existing) {
      set.status = 404;
      return { error: 'Strategy not found' };
    }

    const strategy = await prisma.strategy.update({
      where: { id: params.id },
      data: {
        isActive: !existing.isActive,
      },
      include: {
        game: true,
        items: {
          include: {
            item: true,
          },
        },
        stats: true,
      },
    });

    return { strategy };
  })

  // Get strategy transactions
  .get('/:id/transactions', async ({ params, headers, set }) => {
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

    const transactions = await prisma.transaction.findMany({
      where: {
        strategyId: params.id,
        userId: session.userId,
      },
      orderBy: { executedAt: 'desc' },
    });

    return { transactions };
  });
