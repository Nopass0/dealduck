'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

const subscriptionHistory = [
  {
    id: '1',
    plan: 'Premium',
    status: 'expired',
    startDate: '2024-01-01',
    endDate: '2024-02-01',
    autoRenew: false,
  },
  // Add more mock data as needed
];

const plans = [
  {
    name: 'Basic',
    price: '$9.99/month',
    features: [
      'Up to 5 strategies',
      'Basic market data',
      'Email support',
    ],
  },
  {
    name: 'Premium',
    price: '$19.99/month',
    features: [
      'Unlimited strategies',
      'Real-time market data',
      'Priority support',
      'Advanced analytics',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$49.99/month',
    features: [
      'Everything in Premium',
      'Custom bot configurations',
      'Dedicated support',
      'API access',
    ],
  },
];

export default function SubscriptionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Subscription</h1>
        <p className="text-muted-foreground">
          Manage your subscription and billing
        </p>
      </div>

      {/* Current Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>
              Your active subscription status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold">Free Plan</p>
                <p className="text-sm text-muted-foreground">
                  Upgrade to unlock more features
                </p>
              </div>
              <Button>Upgrade Now</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Available Plans */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Available Plans</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className={plan.popular ? 'border-primary' : ''}>
                {plan.popular && (
                  <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium rounded-t-lg">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription className="text-2xl font-bold text-foreground">
                    {plan.price}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.popular ? 'default' : 'outline'}
                    className="w-full"
                  >
                    Subscribe
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subscription History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Subscription History</CardTitle>
            <CardDescription>
              Your past and current subscriptions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {subscriptionHistory.length > 0 ? (
              <div className="space-y-4">
                {subscriptionHistory.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0"
                  >
                    <div>
                      <p className="font-medium">{sub.plan}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(sub.startDate).toLocaleDateString()} -{' '}
                        {new Date(sub.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {sub.status === 'active' && (
                        <span className="flex items-center text-sm text-green-600">
                          <CheckCircle className="mr-1 h-4 w-4" />
                          Active
                        </span>
                      )}
                      {sub.status === 'expired' && (
                        <span className="flex items-center text-sm text-red-600">
                          <XCircle className="mr-1 h-4 w-4" />
                          Expired
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No subscription history yet
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
