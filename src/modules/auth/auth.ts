import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { env } from '../../config/env.js';
import { db } from '../../database/db.js';
import * as schema from '../../database/schema/index.js';
import { provisionTenantForUser } from './tenant-provisioning.js';

export const auth = betterAuth({
  baseURL: env.betterAuthUrl,
  secret: env.betterAuthSecret,
  basePath: '/api/auth',
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
      verification: schema.verifications,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      tenantId: {
        type: 'string',
        required: false,
        returned: true,
        input: false,
      },
    },
  },
  session: {
    cookieCache: {
      enabled: true,
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const tenant = await provisionTenantForUser(user);
          return { data: { ...user, tenantId: tenant.id } };
        },
      },
    },
  },
});

export type Session = typeof auth.$Infer.Session;
