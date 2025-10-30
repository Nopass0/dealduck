'use client';

import { LogOut } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useAuth } from '@/hooks/useAuth';
import { Button } from './ui/button';

export function UserProfile() {
  const { user, token, clearAuth } = useAuthStore();
  const { logout } = useAuth();
  const router = useRouter();

  if (!user || !token) {
    return null;
  }

  const handleLogout = async () => {
    await logout(token);
    clearAuth();
    router.push('/');
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
          <Image
            src={user.avatar}
            alt={user.username}
            fill
            className="object-cover"
          />
        </div>
        <div className="hidden md:block">
          <p className="text-sm font-semibold">{user.username}</p>
          <p className="text-xs text-muted-foreground">
            Steam ID: {user.steamId.slice(0, 8)}...
          </p>
        </div>
      </div>

      <Button
        onClick={handleLogout}
        variant="outline"
        size="sm"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </Button>
    </div>
  );
}
