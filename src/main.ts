import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

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

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const PORT = process.env.PORT || 5000
  await app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
}
bootstrap();
