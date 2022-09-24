import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

const PORT = process.env.PORT;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe())
    app.use(cookieParser());
    app.enableCors({
      "origin": process.env.CORS_ORIGIN,
      "methods": process.env.CORS_METHODS,
      "credentials": true,
      "preflightContinue": false,
      "optionsSuccessStatus": 200,
    });

    await app.listen(PORT, () =>
      console.log(`App started in localhost:${PORT}`)
    );
  } catch (e) {
    console.log(e)
  }
}

bootstrap();

