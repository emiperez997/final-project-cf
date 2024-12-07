import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './common/filters/prisma.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import express from 'express';
import path from 'path';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule);

  server.use(
    '/swagger-ui',
    express.static(
      path.join(__dirname, '..', 'node_modules', 'swagger-ui-dist'),
    ),
  );

  app.useGlobalFilters(new PrismaClientExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.setGlobalPrefix('/api');

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Proyecto Final - Código Facilito')
    .setDescription(
      'Documentación de la API del proyecto final del curso de NestJS de Código Facilito',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    customCssUrl: '/swagger-ui/swagger-ui.css',
    customJs: '/swagger-ui/swagger-ui-bundle.js',
    customJsStr: '/swagger-ui/swagger-ui-standalone-preset.js',
  });

  await app.listen(process.env.PORT ?? 5000);

  await app.init();
  return server;
}
bootstrap();
