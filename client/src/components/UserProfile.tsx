'use client';

import { LogOut, User as UserIcon } from 'lucide-react';
import Image from 'next/image';
import { useAuthStore } from '@/store/authStore';
import { useAuth } from '@/hooks/useAuth';

export function UserProfile() {
  const { user, token, clearAuth } = useAuthStore();
  const { logout } = useAuth();

  if (!user || !token) {
    return null;
  }

  const handleLogout = async () => {
    await logout(token);
    clearAuth();
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500">
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt={user.username}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <UserIcon size={32} className="text-gray-400" />
          </div>
        )}
      </div>

      <div className="flex-1">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
          {user.username}
        </h3>
        <a
          href={user.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          View Steam Profile
        </a>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}
