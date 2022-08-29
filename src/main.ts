import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser()); 
  app.enableCors({
    "origin": "*", // http://localhost:3000
    "methods": "GET,PUT,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 200
  }
  );

  await app.listen(PORT, () => 
    console.log(`App started in localhost:${PORT}`)
  );
}



bootstrap();

