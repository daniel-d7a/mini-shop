import 'dotenv/config';
import { z } from 'zod';

const DEFAULT_DATABASE_URL =
  'postgresql://postgres:postgres@localhost:5432/mini_shop';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  DATABASE_URL: z.url().default(DEFAULT_DATABASE_URL),
  BETTER_AUTH_SECRET: z
    .string()
    .min(16, 'BETTER_AUTH_SECRET must be at least 16 characters')
    .default('dev-only-change-me-in-production'),
  BETTER_AUTH_URL: z.url().default('http://localhost:3000'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((issue) => `  - ${issue.path.join('.') || '(root)'}: ${issue.message}`)
    .join('\n');
  throw new Error(`Invalid environment variables:\n${issues}`);
}

export const env = {
  nodeEnv: parsed.data.NODE_ENV,
  port: parsed.data.PORT,
  databaseUrl: parsed.data.DATABASE_URL,
  betterAuthSecret: parsed.data.BETTER_AUTH_SECRET,
  betterAuthUrl: parsed.data.BETTER_AUTH_URL,
} as const;

export type Env = typeof env;
