import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PipeValidator } from './config/pipe-validator.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(PipeValidator);
  await app.listen(3000);
}
bootstrap();
