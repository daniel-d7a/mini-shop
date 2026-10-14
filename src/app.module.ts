import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { DatabaseModule } from './database/db.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { TenantsModule } from './modules/tenants/tenants.module.js';
import { StoreConfigModule } from './modules/store-config/store-config.module.js';
import { MediaModule } from './modules/media/media.module.js';
import { CatalogModule } from './modules/catalog/catalog.module.js';
import { InventoryModule } from './modules/inventory/inventory.module.js';
import { OrdersModule } from './modules/orders/orders.module.js';
import { PromotionsModule } from './modules/promotions/promotions.module.js';
import { CustomersModule } from './modules/customers/customers.module.js';
import { AnalyticsModule } from './modules/analytics/analytics.module.js';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    TenantsModule,
    StoreConfigModule,
    MediaModule,
    CatalogModule,
    InventoryModule,
    OrdersModule,
    PromotionsModule,
    CustomersModule,
    AnalyticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
