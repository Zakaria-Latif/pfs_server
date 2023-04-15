import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // TODO: Config the database credentials, PORT...
  // Load environment variables
  dotenv.config({
    path: path.resolve(
      __dirname,
      `${
        process.env.NODE_ENV === 'development'
          ? './config/config-dev.env'
          : './config/config-prod.env'
      }`,
    ),
  });

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
