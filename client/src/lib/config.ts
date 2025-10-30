export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const API_ENDPOINTS = {
  AUTH_STEAM: '/api/auth/steam',
  AUTH_CALLBACK: '/api/auth/steam/callback',
  AUTH_ME: '/api/auth/me',
  AUTH_LOGOUT: '/api/auth/logout',
} as const;
