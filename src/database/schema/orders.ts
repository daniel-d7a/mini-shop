import {
  decimal,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { tenants } from './tenants.js';
import { productVariants } from './catalog.js';

export const customers = pgTable(
  'customers',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    tenantId: uuid('tenant_id')
      .notNull()
      .references(() => tenants.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    email: text('email').notNull(),
    phone: text('phone'),
    totalSpent: decimal('total_spent', { precision: 12, scale: 2 })
      .notNull()
      .default('0'),
    orderCount: integer('order_count').notNull().default(0),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index('customers_tenant_idx').on(table.tenantId),
    index('customers_tenant_email_idx').on(table.tenantId, table.email),
  ],
);

export const orders = pgTable(
  'orders',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    tenantId: uuid('tenant_id')
      .notNull()
      .references(() => tenants.id, { onDelete: 'cascade' }),
    customerId: uuid('customer_id').references(() => customers.id, {
      onDelete: 'set null',
    }),
    orderNumber: text('order_number').notNull(),
    status: text('status').notNull().default('pending'),
    paymentStatus: text('payment_status').notNull().default('pending'),
    paymentProvider: text('payment_provider'),
    totalAmount: decimal('total_amount', { precision: 12, scale: 2 }).notNull(),
    discountAmount: decimal('discount_amount', { precision: 12, scale: 2 })
      .notNull()
      .default('0'),
    currency: text('currency').notNull().default('USD'),
    shippingAddress: jsonb('shipping_address'),
    placedAt: timestamp('placed_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index('orders_tenant_idx').on(table.tenantId),
    index('orders_tenant_status_idx').on(table.tenantId, table.status),
    index('orders_tenant_customer_idx').on(table.tenantId, table.customerId),
  ],
);

export const orderItems = pgTable(
  'order_items',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    tenantId: uuid('tenant_id')
      .notNull()
      .references(() => tenants.id, { onDelete: 'cascade' }),
    orderId: uuid('order_id')
      .notNull()
      .references(() => orders.id, { onDelete: 'cascade' }),
    variantId: uuid('variant_id').references(() => productVariants.id, {
      onDelete: 'set null',
    }),
    titleSnapshot: text('title_snapshot').notNull(),
    quantity: integer('quantity').notNull(),
    price: decimal('price', { precision: 12, scale: 2 }).notNull(),
    lineTotal: decimal('line_total', { precision: 12, scale: 2 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index('order_items_tenant_idx').on(table.tenantId),
    index('order_items_order_idx').on(table.orderId),
  ],
);
