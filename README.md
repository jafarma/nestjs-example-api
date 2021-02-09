

## Description

create a CRUD api with [Nest](https://github.com/nestjs/nest) framework TypeScript & typeorm & mysql with synchronize database on develop mode.


![swagger demo](https://github.com/jafarma/nestjs-example-api/blob/master/assets/swagger.JPG?raw=true)

## Prerequisites
```
$ npm i -g @nestjs/cli
```

## Creating api

```bash
$ nest new project-name
$ cd project-name

$ npm install --save @nestjs/typeorm typeorm mysql

$ npm install --save @nestjs/swagger swagger-ui-express


$ nest g resource products
 # ? What transport layer do you use? REST API
 # ? Would you like to generate CRUD entry points? Yes

```

## Update codes

- update ProductsModule

```ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],   //added
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule { }

```

- update ProductsService
```ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private productRepository: Repository<Product>) { }

  create(createProductDto: CreateProductDto) {
    return this.productRepository.save(createProductDto);
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number) {
    return await this.productRepository.findOne({
      where: { id: id }
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    this.productRepository.save(updateProductDto)
  }

  remove(id: number) {
    this.productRepository.delete(id);
  }
}

```

- update entity & Dto classes

```ts
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('customers')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 50 })
    code: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}
```

```ts
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty({ description: 'product name' })
    name: string;

    @ApiProperty({ description: 'product code' })
    code: string;
}
```

- create environment files

```ts
export const environment = {
  production: false,

  LOG_LEVEL: 'debug',

  server: {
    host: '0.0.0.0',
    domainUrl: 'http://localhost:3000',
    port: 3000,
  },

  database: {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'testdb',
    username: 'userdb',
    password: 'password',
    keepConnectionAlive: true,
    logging: true,
    synchronize: true,
  },

};

```

- update app.module.ts

```ts
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
    TypeOrmModule.forRootAsync({   //add
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

```

- update main.ts to handle swagger

```ts
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { environment as env } from '../environments/environment';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config: AppService = app.get(AppService); //config service

  const port = env.server.port || 3333;

  const options = new DocumentBuilder()
    .setTitle('Example API Docs')
    .setDescription('Example API for test')
    .setVersion(config.getVersion())
    .addTag('Example API')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);


  await app.listen(port, () => {
    Logger.log(`Listening at http://localhost:${port}`);
  });
}

bootstrap();

```

- and finally update app.controller.ts & app.service.ts

```ts
import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ description: 'Welcome' })
  @Get()
  root(): string {
    return `<h3>Welcome to Test API</h3>
            <br/>Checkout the <a href="docs">API Docs</a>
            <br/><br/><hr><code>Version: ${this.appService.getVersion()}</code>`;
  }
}
```

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  //TODO: load from package.json
  getVersion(): string {
    return '1.0.0';
  }
}
```




## Installation

```bash
$ git clone https://github.com/jafarma/nestjs-example-api

$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

