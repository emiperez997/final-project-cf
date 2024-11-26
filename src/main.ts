import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './common/filters/prisma.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new PrismaClientExceptionFilter());

  app.setGlobalPrefix('/api');

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
