export interface User {
  id: string;
  steamId: string;
  username: string;
  avatar: string;
  profileUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface SteamProfile {
  steamid: string;
  personaname: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  profileurl: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
