'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { SteamLoginButton } from '@/components/SteamLoginButton';
import { motion } from 'framer-motion';
import { TrendingUp, Package, Zap, Shield } from 'lucide-react';

const features = [
  {
    name: 'Smart Trading',
    description: 'Automated trading strategies for Steam Market items',
    icon: TrendingUp,
  },
  {
    name: 'Inventory Management',
    description: 'Track your items and their market values in real-time',
    icon: Package,
  },
  {
    name: 'Fast Execution',
    description: 'Lightning-fast bot execution with minimal delays',
    icon: Zap,
  },
  {
    name: 'Secure & Safe',
    description: 'Your data is encrypted and stored securely',
    icon: Shield,
  },
];

export default function Home() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-6">
              Welcome to <span className="text-primary">DealDuck</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Automate your Steam Market trading with intelligent strategies.
              Maximize profits while you sleep.
            </p>
            <SteamLoginButton />
          </motion.div>

          {/* Features Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                  className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <Icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{feature.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-primary text-primary-foreground rounded-2xl p-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-lg mb-6 opacity-90">
              Sign in with Steam to start automating your trading today
            </p>
            <SteamLoginButton />
          </motion.div>
        </div>
      </div>
    </main>
  );
}
