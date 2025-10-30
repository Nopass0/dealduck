'use client';

import { useState, useCallback } from 'react';
import { API_BASE_URL, API_ENDPOINTS } from '@/lib/config';
import { AuthUrlResponseSchema, MeResponseSchema } from '@/types';
import type { User } from '@/types';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSteamAuthUrl = useCallback(async (): Promise<string | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH_STEAM}`);

      if (!response.ok) {
        throw new Error('Failed to get Steam auth URL');
      }

      const data = await response.json();
      const validated = AuthUrlResponseSchema.parse(data);

      return validated.url;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getMe = useCallback(async (token: string): Promise<User | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH_ME}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get user data');
      }

      const data = await response.json();
      const validated = MeResponseSchema.parse(data);

      return validated.user;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async (token: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH_LOGOUT}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to logout');
      }

      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    getSteamAuthUrl,
    getMe,
    logout,
  };
}
