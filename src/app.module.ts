import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NodeMailerConfig } from './core/config/nodemailer-config';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthMiddleware } from './core/middlewares/auth.middleware';
import { PermitedRoutes } from './core/constants/permited-routes';
import { JwtUtilityService } from './modules/auth/jwt.service';
import { JwtService } from '@nestjs/jwt';
import { LanguageMiddleware } from './core/middlewares/lang.middleware';
import { AuthProviderMiddleware } from './core/middlewares/auth-provider.middleware';
import { configureMiddlewares } from './core/config/middleware.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NodeMailerConfig,
    MongooseModule.forRoot(process.env.MONGO_URL),
    UserModule,
    AuthModule
  ], 
  controllers: [AppController],
  providers: [AppService,JwtUtilityService,JwtService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    configureMiddlewares(consumer);

  }

}
