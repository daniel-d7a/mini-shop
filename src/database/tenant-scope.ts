import { and, eq, type SQL } from 'drizzle-orm';
import type { PgColumn, PgTable } from 'drizzle-orm/pg-core';

type TenantScopedTable = PgTable & { tenantId: PgColumn };

export function tenantWhere(
  table: TenantScopedTable,
  tenantId: string,
  ...conditions: Array<SQL | undefined>
): SQL {
  return and(eq(table.tenantId, tenantId), ...conditions) as SQL;
}
