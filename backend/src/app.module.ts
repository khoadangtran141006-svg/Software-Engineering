import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ProductsModule } from './products/products.module.js';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ProductsModule],
})
export class AppModule {}