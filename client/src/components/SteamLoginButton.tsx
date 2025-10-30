'use client';

import { LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export function SteamLoginButton() {
  const { getSteamAuthUrl, loading } = useAuth();

  const handleLogin = async () => {
    const url = await getSteamAuthUrl();
    if (url) {
      window.location.href = url;
    }
  };

  return (
    <button
      onClick={handleLogin}
      disabled={loading}
      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <LogIn size={20} />
      {loading ? 'Loading...' : 'Login with Steam'}
    </button>
  );
}
