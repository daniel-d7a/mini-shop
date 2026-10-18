import { eq } from 'drizzle-orm';
import { randomUUID } from 'node:crypto';
import { db } from '../../database/db.js';
import { tenants } from '../../database/schema/index.js';

function toSubdomain(value: string): string {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug || 'store';
}

export async function provisionTenantForUser(input: {
  name?: string | null;
  email: string;
}) {
  const base = toSubdomain(input.name || input.email.split('@')[0]);
  const existing = await db
    .select({ id: tenants.id })
    .from(tenants)
    .where(eq(tenants.subdomain, base))
    .limit(1);
  const subdomain =
    existing.length > 0
      ? `${base}-${randomUUID().slice(0, 8).replace(/-/g, '')}`
      : base;
  const [tenant] = await db
    .insert(tenants)
    .values({ name: input.name?.trim() || `Store ${subdomain}`, subdomain })
    .returning();
  return tenant;
}
