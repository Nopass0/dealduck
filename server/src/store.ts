import type { User, Session } from './types';

class DataStore {
  private users: Map<string, User> = new Map();
  private sessions: Map<string, Session> = new Map();
  private steamIdToUserId: Map<string, string> = new Map();

  // User methods
  createUser(user: User): User {
    this.users.set(user.id, user);
    this.steamIdToUserId.set(user.steamId, user.id);
    return user;
  }

  getUserById(id: string): User | undefined {
    return this.users.get(id);
  }

  getUserBySteamId(steamId: string): User | undefined {
    const userId = this.steamIdToUserId.get(steamId);
    if (!userId) return undefined;
    return this.users.get(userId);
  }

  updateUser(id: string, updates: Partial<User>): User | undefined {
    const user = this.users.get(id);
    if (!user) return undefined;

    const updatedUser = { ...user, ...updates, updatedAt: new Date() };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Session methods
  createSession(session: Session): Session {
    this.sessions.set(session.id, session);
    return session;
  }

  getSessionByToken(token: string): Session | undefined {
    for (const session of this.sessions.values()) {
      if (session.token === token && session.expiresAt > new Date()) {
        return session;
      }
    }
    return undefined;
  }

  deleteSession(id: string): boolean {
    return this.sessions.delete(id);
  }

  deleteExpiredSessions(): void {
    const now = new Date();
    for (const [id, session] of this.sessions.entries()) {
      if (session.expiresAt <= now) {
        this.sessions.delete(id);
      }
    }
  }
}

export const store = new DataStore();
