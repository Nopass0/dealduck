'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PriceChart } from '@/components/PriceChart';
import { Package, TrendingUp, TrendingDown } from 'lucide-react';
import Image from 'next/image';

// Mock data
const mockInventory = [
  {
    id: '1',
    name: 'AK-47 | Redline (Field-Tested)',
    game: 'Counter-Strike 2',
    iconUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5lpKKqPrxN7LEmyVQ7MEpiLuSrYmnjQO3-UdsZGHyd4_Bd1RvNQ7T_FDrw-_ng5Pu75iY1zI97bhJAJxf/360fx360f',
    currentPrice: 25.50,
    priceChange: 2.5,
    acquiredAt: '2024-01-15',
  },
  // Add more mock items as needed
];

const mockPriceHistory = Array.from({ length: 30 }, (_, i) => ({
  timestamp: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString(),
  price: 25 + Math.random() * 5 - 2.5,
}));

export default function InventoryPage() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Inventory</h1>
          <p className="text-muted-foreground">
            View your items and their market prices
          </p>
        </div>
        <Button>
          <Package className="mr-2 h-4 w-4" />
          Sync Inventory
        </Button>
      </div>

      {/* Inventory Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Items
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockInventory.length}</div>
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
                Total Value
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${mockInventory.reduce((sum, item) => sum + item.currentPrice, 0).toFixed(2)}
              </div>
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
                Average Change
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+2.5%</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Inventory Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Your Items</CardTitle>
              <CardDescription>
                Items in your Steam inventory
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockInventory.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-center space-x-4 rounded-lg border p-4 cursor-pointer transition-colors ${
                      selectedItem === item.id
                        ? 'border-primary bg-accent'
                        : 'hover:bg-accent'
                    }`}
                    onClick={() => setSelectedItem(item.id)}
                  >
                    <div className="relative h-16 w-16 rounded bg-muted">
                      <Image
                        src={item.iconUrl}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.game}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-lg font-bold">
                          ${item.currentPrice.toFixed(2)}
                        </span>
                        <span
                          className={`text-sm flex items-center ${
                            item.priceChange >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {item.priceChange >= 0 ? (
                            <TrendingUp className="h-3 w-3 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 mr-1" />
                          )}
                          {Math.abs(item.priceChange)}%
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {mockInventory.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No items in inventory. Sync your Steam inventory to get started.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {selectedItem ? (
            <PriceChart
              data={mockPriceHistory}
              itemName={mockInventory.find(i => i.id === selectedItem)?.name || ''}
            />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Price History</CardTitle>
                <CardDescription>
                  Select an item to view its price history
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-[300px]">
                <p className="text-muted-foreground">
                  Click on an item to see its price chart
                </p>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}
