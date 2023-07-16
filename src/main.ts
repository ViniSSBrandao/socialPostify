import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = parseInt(process.env.PORT) || 3000;
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(PORT);
  console.log(`server is running on PORT: ${PORT}`);
}
bootstrap();
