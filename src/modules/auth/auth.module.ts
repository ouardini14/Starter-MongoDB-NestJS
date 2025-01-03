import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { TokensExpiration } from 'src/core/enums/tokens-expiration.enum';
import {  JwtUtilityService } from './jwt.service';
import { EmailService } from 'src/core/lib/third-party';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.LOGIN_SECRET_KEY,
        signOptions: { expiresIn: TokensExpiration.LOGIN },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtUtilityService, EmailService],
})
export class AuthModule {}
