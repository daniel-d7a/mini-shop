import pg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { env } from '../config/env.js';
import { schemaRelations } from './schema/relations.js';

export const pgPool = new pg.Pool({
  connectionString: env.databaseUrl,
  max: 10,
});

export const db = drizzle({
  client: pgPool,
  relations: schemaRelations,
});

export type Database = typeof db;
