export const config = {
  port: process.env.PORT || 3001,
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  steamApiKey: process.env.STEAM_API_KEY || '',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  backendUrl: process.env.BACKEND_URL || 'http://localhost:3001',
};

export const getReturnUrl = () => `${config.backendUrl}/api/auth/steam/callback`;
export const getRealm = () => config.backendUrl;
