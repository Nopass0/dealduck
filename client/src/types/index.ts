import { z } from 'zod';

// User schema
export const UserSchema = z.object({
  id: z.string(),
  steamId: z.string(),
  username: z.string(),
  avatar: z.string().url(),
  profileUrl: z.string().url(),
  createdAt: z.string().transform((val) => new Date(val)),
  updatedAt: z.string().transform((val) => new Date(val)),
});

export type User = z.infer<typeof UserSchema>;

// Auth response schema
export const AuthResponseSchema = z.object({
  user: UserSchema,
  token: z.string(),
});

export type AuthResponse = z.infer<typeof AuthResponseSchema>;

// Auth URL response schema
export const AuthUrlResponseSchema = z.object({
  url: z.string().url(),
});

export type AuthUrlResponse = z.infer<typeof AuthUrlResponseSchema>;

// Me response schema
export const MeResponseSchema = z.object({
  user: UserSchema,
});

export type MeResponse = z.infer<typeof MeResponseSchema>;
