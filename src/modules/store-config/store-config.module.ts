import { Module } from '@nestjs/common';
import { StoreConfigController } from './store-config.controller.js';
import { StoreConfigService } from './store-config.service.js';

@Module({
  controllers: [StoreConfigController],
  providers: [StoreConfigService],
  exports: [StoreConfigService],
})
export class StoreConfigModule {}
