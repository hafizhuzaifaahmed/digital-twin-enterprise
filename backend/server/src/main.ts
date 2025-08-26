import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SeedService } from './auth/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  // Seed SUPER_ADMIN role and user
  const seeder = app.get(SeedService);
  await seeder.seedSuperAdmin();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
