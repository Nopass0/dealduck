'use client';

import { useAuthStore } from '@/store/authStore';
import { SteamLoginButton } from '@/components/SteamLoginButton';
import { UserProfile } from '@/components/UserProfile';

export default function Home() {
  const { isAuthenticated } = useAuthStore();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            DealDuck
          </h1>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8">
            {isAuthenticated ? (
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
                  Welcome back!
                </h2>
                <UserProfile />
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Sign in to continue
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Login with your Steam account to access all features
                </p>
                <div className="flex justify-center">
                  <SteamLoginButton />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
