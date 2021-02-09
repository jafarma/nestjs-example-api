import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { environment as env } from '../environments/environment';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config: AppService = app.get(AppService);

  const port = env.server.port || 3333;

  const options = new DocumentBuilder()
    .setTitle('Test API Docs')
    .setDescription('Todo API for const')
    .setVersion(config.getVersion())
    .addTag('Test API')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);


  await app.listen(port, () => {
    Logger.log(`Listening at http://localhost:${port}`);
  });
}

bootstrap();
