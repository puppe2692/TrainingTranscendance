import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({whitelist: true})); // this function enables the validation pipe for all routes, validation pipe is used to validate the data sent to the server, whitelist: true means that the validation pipe will only allow the properties that are defined in the DTOs to be sent to the server, if a property is not defined in the DTO, it will be ignored
  await app.listen(8080);
}
bootstrap();
