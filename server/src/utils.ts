import { randomBytes } from 'crypto';

export function generateId(): string {
  return randomBytes(16).toString('hex');
}

export function generateToken(): string {
  return randomBytes(32).toString('hex');
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
