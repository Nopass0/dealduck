import { Elysia } from 'elysia';
import { jwt } from '@elysiajs/jwt';
import { cors } from '@elysiajs/cors';
import { cookie } from '@elysiajs/cookie';
import { SteamAuth } from './steam';
import { store } from './store';
import { config, getReturnUrl, getRealm } from './config';
import { generateId, generateToken, addDays } from './utils';
import type { User, AuthResponse } from './types';

const steamAuth = new SteamAuth(
  config.steamApiKey,
  getRealm(),
  getReturnUrl()
);

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

  // Get Steam auth URL
  .get('/api/auth/steam', () => {
    const authUrl = steamAuth.getAuthUrl();
    return { url: authUrl };
  })

  // Steam OpenID callback
  .get('/api/auth/steam/callback', async ({ query, set }) => {
    try {
      // Convert query to Record<string, string>
      const params: Record<string, string> = {};
      for (const [key, value] of Object.entries(query)) {
        if (typeof value === 'string') {
          params[key] = value;
        }
      }

      // Verify Steam authentication
      const steamId = await steamAuth.verifyAuth(params);

      if (!steamId) {
        set.status = 401;
        return { error: 'Steam authentication failed' };
      }

      // Get or create user
      let user = store.getUserBySteamId(steamId);

      if (!user) {
        // Fetch Steam profile
        const steamProfile = await steamAuth.getPlayerSummary(steamId);

        if (!steamProfile) {
          set.status = 500;
          return { error: 'Failed to fetch Steam profile' };
        }

        // Create new user
        user = store.createUser({
          id: generateId(),
          steamId: steamProfile.steamid,
          username: steamProfile.personaname,
          avatar: steamProfile.avatarfull,
          profileUrl: steamProfile.profileurl,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      } else {
        // Update existing user data
        const steamProfile = await steamAuth.getPlayerSummary(steamId);
        if (steamProfile) {
          user = store.updateUser(user.id, {
            username: steamProfile.personaname,
            avatar: steamProfile.avatarfull,
            profileUrl: steamProfile.profileurl,
          }) || user;
        }
      }

      // Create session
      const token = generateToken();
      store.createSession({
        id: generateId(),
        userId: user.id,
        token,
        expiresAt: addDays(new Date(), 30),
        createdAt: new Date(),
      });

      // Redirect to frontend with token
      set.redirect = `${config.frontendUrl}/auth/callback?token=${token}`;
      return;
    } catch (error) {
      console.error('Steam callback error:', error);
      set.status = 500;
      return { error: 'Internal server error' };
    }
  })

  // Get current user
  .get('/api/auth/me', async ({ headers, set }) => {
    const authHeader = headers['authorization'];
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      set.status = 401;
      return { error: 'No token provided' };
    }

    const session = store.getSessionByToken(token);

    if (!session) {
      set.status = 401;
      return { error: 'Invalid or expired token' };
    }

    const user = store.getUserById(session.userId);

    if (!user) {
      set.status = 404;
      return { error: 'User not found' };
    }

    return { user };
  })

  // Logout
  .post('/api/auth/logout', async ({ headers, set }) => {
    const authHeader = headers['authorization'];
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      set.status = 401;
      return { error: 'No token provided' };
    }

    const session = store.getSessionByToken(token);

    if (session) {
      store.deleteSession(session.id);
    }

    return { success: true };
  })

  .listen(config.port);

console.log(`>Š Elysia is running at ${app.server?.hostname}:${app.server?.port}`);

export default app;
