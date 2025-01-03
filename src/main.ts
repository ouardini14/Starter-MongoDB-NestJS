import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PermitedRoutes } from './core/constants/permited-routes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Starter NestJS API')
    .setDescription('A starter API for NestJS with Auth, JWT, MongoDB, Email Service, and Multi-Language Support')
    .setVersion('1.0')
    .addServer('http://localhost:' + (process.env.PORT ?? 2100) +'/', 'Local environment')
   /* .addServer('https://staging.yourapi.com/', 'Staging')
    .addServer('https://production.yourapi.com/', 'Production')*/
    .addTag('Authentication', 'Authentication by email or provider (Google, etc.)')
    .addTag('JWT', 'Access & Refresh token handling')
    .addTag('MongoDB', 'MongoDB Integration')
    .addTag('Email', 'NodeMailer Email Service Integration')
    .addTag('Multi-Language', 'Multi-Language message and email handling')
    .addTag('Response', 'Custom HTTP Response Builder')
    .addBearerAuth() 
    .build();


  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  PermitedRoutes.forEach(route => {
    SwaggerModule.setup(route.path, app, document);
  });


  app.enableCors();
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 2100);
}
bootstrap();
