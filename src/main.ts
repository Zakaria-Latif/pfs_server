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
  
  
    // Access-Control
    const whitelist = [
      'http://localhost:5000',
      'http://localhost:3000',
      'http://localhost:8081',
      'http://127.0.1.8:8081',
      'http://192.168.1.5:3000',
      'http://192.168.1.5:8081',
      'http://192.168.1.8:8081',
      'http://192.168.1.8:8080',
      undefined,
  ];
  app.enableCors({
    // origin: (origin: any, callback: any) => {
    //   if (whitelist.indexOf(origin) !== -1) {
    //       callback(null, true);
    //   } else {
    //       callback(new Error("Not allowed by CORS"));
    //   }
    // },
    origin: "*",
    credentials: true,
  });
  const PORT = process.env.PORT || 5000
  await app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
  
}
bootstrap();
