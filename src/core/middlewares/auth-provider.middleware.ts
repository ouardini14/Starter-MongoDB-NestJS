import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Lang } from '../enums/lang-enum';
import { AuthProvider } from '../enums/auth-providers.enum';

@Injectable()
export class AuthProviderMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const authProvider = req.query['provider'] as AuthProvider;
        req['authProvider'] = Object.values(AuthProvider).includes(authProvider) ? authProvider :AuthProvider.Email
        next();
    }
}
