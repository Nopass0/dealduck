import { Elysia } from 'elysia';
import { SteamAuth } from '../steam';
import { prisma } from '../db';
import { config, getReturnUrl, getRealm } from '../config';
import { generateToken, addDays } from '../utils';

const steamAuth = new SteamAuth(
  config.steamApiKey,
  getRealm(),
  getReturnUrl()
);

export const authRoutes = new Elysia({ prefix: '/api/auth' })
  // Get Steam auth URL
  .get('/steam', () => {
    const authUrl = steamAuth.getAuthUrl();
    return { url: authUrl };
  })

  // Steam OpenID callback
  .get('/steam/callback', async ({ query, set }) => {
    try {
      const params: Record<string, string> = {};
      for (const [key, value] of Object.entries(query)) {
        if (typeof value === 'string') {
          params[key] = value;
        }
      }

      const steamId = await steamAuth.verifyAuth(params);

      if (!steamId) {
        set.status = 401;
        return { error: 'Steam authentication failed' };
      }

      // Get or create user
      let user = await prisma.user.findUnique({
        where: { steamId },
      });

      if (!user) {
        const steamProfile = await steamAuth.getPlayerSummary(steamId);

        if (!steamProfile) {
          set.status = 500;
          return { error: 'Failed to fetch Steam profile' };
        }

        user = await prisma.user.create({
          data: {
            steamId: steamProfile.steamid,
            username: steamProfile.personaname,
            avatar: steamProfile.avatarfull,
            profileUrl: steamProfile.profileurl,
          },
        });
      } else {
        const steamProfile = await steamAuth.getPlayerSummary(steamId);
        if (steamProfile) {
          user = await prisma.user.update({
            where: { id: user.id },
            data: {
              username: steamProfile.personaname,
              avatar: steamProfile.avatarfull,
              profileUrl: steamProfile.profileurl,
            },
          });
        }
      }

      // Create session
      const token = generateToken();
      await prisma.session.create({
        data: {
          userId: user.id,
          token,
          expiresAt: addDays(new Date(), 30),
        },
      });

      set.redirect = `${config.frontendUrl}/auth/callback?token=${token}`;
      return;
    } catch (error) {
      console.error('Steam callback error:', error);
      set.status = 500;
      return { error: 'Internal server error' };
    }
  })

  // Get current user
  .get('/me', async ({ headers, set }) => {
    const authHeader = headers['authorization'];
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      set.status = 401;
      return { error: 'No token provided' };
    }

    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!session || session.expiresAt < new Date()) {
      set.status = 401;
      return { error: 'Invalid or expired token' };
    }

    return { user: session.user };
  })

  // Logout
  .post('/logout', async ({ headers, set }) => {
    const authHeader = headers['authorization'];
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      set.status = 401;
      return { error: 'No token provided' };
    }

    await prisma.session.delete({
      where: { token },
    }).catch(() => {});

    return { success: true };
  });
