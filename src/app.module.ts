import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { environment as env } from '../environments/environment';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Product } from './products/entities/product.entity';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
      ({
        ...env.database,
        entities: [Product],
      } as ConnectionOptions)
    }),
    ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
