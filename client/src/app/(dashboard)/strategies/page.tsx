'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Plus,
  Play,
  Pause,
  Edit,
  Trash2,
  TrendingUp,
  DollarSign,
  Activity,
} from 'lucide-react';

// Mock data
const mockStrategies = [
  {
    id: '1',
    name: 'CS2 Redline Flip',
    game: 'Counter-Strike 2',
    isActive: false,
    itemsCount: 3,
    stats: {
      totalProfit: 125.50,
      totalBought: 15,
      totalSold: 12,
      successRate: 80,
    },
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Dota 2 Arcana Trading',
    game: 'Dota 2',
    isActive: true,
    itemsCount: 5,
    stats: {
      totalProfit: 450.00,
      totalBought: 8,
      totalSold: 7,
      successRate: 87.5,
    },
    createdAt: '2024-01-10',
  },
];

export default function StrategiesPage() {
  const [strategies, setStrategies] = useState(mockStrategies);

  const toggleStrategy = (id: string) => {
    setStrategies(prev =>
      prev.map(s => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Strategies</h1>
          <p className="text-muted-foreground">
            Create and manage your trading strategies
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Strategy
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Strategies
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {strategies.filter(s => s.isActive).length}
              </div>
              <p className="text-xs text-muted-foreground">
                of {strategies.length} total
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Profit
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                $
                {strategies
                  .reduce((sum, s) => sum + s.stats.totalProfit, 0)
                  .toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                across all strategies
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg Success Rate
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(
                  strategies.reduce((sum, s) => sum + s.stats.successRate, 0) /
                  strategies.length
                ).toFixed(1)}
                %
              </div>
              <p className="text-xs text-muted-foreground">
                overall performance
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Strategies List */}
      <div className="space-y-4">
        {strategies.map((strategy, index) => (
          <motion.div
            key={strategy.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold">{strategy.name}</h3>
                      {strategy.isActive && (
                        <span className="flex items-center space-x-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                          <div className="h-2 w-2 rounded-full bg-green-600 animate-pulse" />
                          <span>Active</span>
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {strategy.game} • {strategy.itemsCount} items
                    </p>

                    <div className="grid grid-cols-4 gap-4 mt-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Profit</p>
                        <p className="text-lg font-bold text-green-600">
                          ${strategy.stats.totalProfit.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Bought</p>
                        <p className="text-lg font-semibold">
                          {strategy.stats.totalBought}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Sold</p>
                        <p className="text-lg font-semibold">
                          {strategy.stats.totalSold}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Success</p>
                        <p className="text-lg font-semibold">
                          {strategy.stats.successRate}%
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      size="icon"
                      variant={strategy.isActive ? 'destructive' : 'default'}
                      onClick={() => toggleStrategy(strategy.id)}
                    >
                      {strategy.isActive ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    <Button size="icon" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {strategies.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <TrendingUp className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No strategies yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Create your first trading strategy to get started
              </p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Strategy
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
