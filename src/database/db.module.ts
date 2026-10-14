import { Global, Module } from '@nestjs/common';
import type { Pool } from 'pg';
import { db, pgPool } from './db.js';
import type { Database } from './db.js';

export const DATABASE = 'DATABASE';
export const PG_POOL = 'PG_POOL';

@Global()
@Module({
  providers: [
    { provide: DATABASE, useValue: db },
    { provide: PG_POOL, useValue: pgPool },
  ],
  exports: [DATABASE, PG_POOL],
})
export class DatabaseModule {}

export type DbProvider = Database;
export type PoolProvider = Pool;
