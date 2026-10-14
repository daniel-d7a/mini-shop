import { defineRelations } from 'drizzle-orm';
import { accounts, sessions, users, verifications } from './auth.js';
import { tenants, policies } from './tenants.js';
import { categories, products, productVariants } from './catalog.js';
import {
  inventoryLocations,
  inventoryLevels,
  inventoryLogs,
} from './inventory.js';
import { customers, orders, orderItems } from './orders.js';
import { coupons } from './promotions.js';

const schema = {
  users,
  sessions,
  accounts,
  verifications,
  tenants,
  policies,
  categories,
  products,
  productVariants,
  inventoryLocations,
  inventoryLevels,
  inventoryLogs,
  customers,
  orders,
  orderItems,
  coupons,
};

export const schemaRelations = defineRelations(schema, (r) => ({
  users: {
    tenant: r.one.tenants({
      from: r.users.tenantId,
      to: r.tenants.id,
    }),
    sessions: r.many.sessions({
      from: r.users.id,
      to: r.sessions.userId,
    }),
    accounts: r.many.accounts({
      from: r.users.id,
      to: r.accounts.userId,
    }),
    policies: r.many.policies({
      from: r.users.id,
      to: r.policies.userId,
    }),
  },
  sessions: {
    user: r.one.users({
      from: r.sessions.userId,
      to: r.users.id,
    }),
  },
  accounts: {
    user: r.one.users({
      from: r.accounts.userId,
      to: r.users.id,
    }),
  },
  tenants: {
    users: r.many.users({
      from: r.tenants.id,
      to: r.users.tenantId,
    }),
    policies: r.many.policies({
      from: r.tenants.id,
      to: r.policies.tenantId,
    }),
    categories: r.many.categories({
      from: r.tenants.id,
      to: r.categories.tenantId,
    }),
    products: r.many.products({
      from: r.tenants.id,
      to: r.products.tenantId,
    }),
    productVariants: r.many.productVariants({
      from: r.tenants.id,
      to: r.productVariants.tenantId,
    }),
    inventoryLocations: r.many.inventoryLocations({
      from: r.tenants.id,
      to: r.inventoryLocations.tenantId,
    }),
    inventoryLevels: r.many.inventoryLevels({
      from: r.tenants.id,
      to: r.inventoryLevels.tenantId,
    }),
    inventoryLogs: r.many.inventoryLogs({
      from: r.tenants.id,
      to: r.inventoryLogs.tenantId,
    }),
    customers: r.many.customers({
      from: r.tenants.id,
      to: r.customers.tenantId,
    }),
    orders: r.many.orders({
      from: r.tenants.id,
      to: r.orders.tenantId,
    }),
    orderItems: r.many.orderItems({
      from: r.tenants.id,
      to: r.orderItems.tenantId,
    }),
    coupons: r.many.coupons({
      from: r.tenants.id,
      to: r.coupons.tenantId,
    }),
  },
  policies: {
    tenant: r.one.tenants({
      from: r.policies.tenantId,
      to: r.tenants.id,
    }),
    user: r.one.users({
      from: r.policies.userId,
      to: r.users.id,
    }),
  },
  categories: {
    tenant: r.one.tenants({
      from: r.categories.tenantId,
      to: r.tenants.id,
    }),
    parent: r.one.categories({
      from: r.categories.parentId,
      to: r.categories.id,
      alias: 'parent',
    }),
    children: r.many.categories({
      from: r.categories.id,
      to: r.categories.parentId,
      alias: 'children',
    }),
    products: r.many.products({
      from: r.categories.id,
      to: r.products.categoryId,
    }),
  },
  products: {
    tenant: r.one.tenants({
      from: r.products.tenantId,
      to: r.tenants.id,
    }),
    category: r.one.categories({
      from: r.products.categoryId,
      to: r.categories.id,
    }),
    variants: r.many.productVariants({
      from: r.products.id,
      to: r.productVariants.productId,
    }),
  },
  productVariants: {
    tenant: r.one.tenants({
      from: r.productVariants.tenantId,
      to: r.tenants.id,
    }),
    product: r.one.products({
      from: r.productVariants.productId,
      to: r.products.id,
    }),
    inventoryLevels: r.many.inventoryLevels({
      from: r.productVariants.id,
      to: r.inventoryLevels.variantId,
    }),
    orderItems: r.many.orderItems({
      from: r.productVariants.id,
      to: r.orderItems.variantId,
    }),
  },
  inventoryLocations: {
    tenant: r.one.tenants({
      from: r.inventoryLocations.tenantId,
      to: r.tenants.id,
    }),
    levels: r.many.inventoryLevels({
      from: r.inventoryLocations.id,
      to: r.inventoryLevels.locationId,
    }),
    logs: r.many.inventoryLogs({
      from: r.inventoryLocations.id,
      to: r.inventoryLogs.locationId,
    }),
  },
  inventoryLevels: {
    tenant: r.one.tenants({
      from: r.inventoryLevels.tenantId,
      to: r.tenants.id,
    }),
    location: r.one.inventoryLocations({
      from: r.inventoryLevels.locationId,
      to: r.inventoryLocations.id,
    }),
    variant: r.one.productVariants({
      from: r.inventoryLevels.variantId,
      to: r.productVariants.id,
    }),
  },
  inventoryLogs: {
    tenant: r.one.tenants({
      from: r.inventoryLogs.tenantId,
      to: r.tenants.id,
    }),
    location: r.one.inventoryLocations({
      from: r.inventoryLogs.locationId,
      to: r.inventoryLocations.id,
    }),
    variant: r.one.productVariants({
      from: r.inventoryLogs.variantId,
      to: r.productVariants.id,
    }),
  },
  customers: {
    tenant: r.one.tenants({
      from: r.customers.tenantId,
      to: r.tenants.id,
    }),
    orders: r.many.orders({
      from: r.customers.id,
      to: r.orders.customerId,
    }),
  },
  orders: {
    tenant: r.one.tenants({
      from: r.orders.tenantId,
      to: r.tenants.id,
    }),
    customer: r.one.customers({
      from: r.orders.customerId,
      to: r.customers.id,
    }),
    items: r.many.orderItems({
      from: r.orders.id,
      to: r.orderItems.orderId,
    }),
  },
  orderItems: {
    tenant: r.one.tenants({
      from: r.orderItems.tenantId,
      to: r.tenants.id,
    }),
    order: r.one.orders({
      from: r.orderItems.orderId,
      to: r.orders.id,
    }),
    variant: r.one.productVariants({
      from: r.orderItems.variantId,
      to: r.productVariants.id,
    }),
  },
  coupons: {
    tenant: r.one.tenants({
      from: r.coupons.tenantId,
      to: r.tenants.id,
    }),
  },
}));
