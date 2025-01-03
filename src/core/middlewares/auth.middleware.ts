import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtUtilityService } from 'src/modules/auth/jwt.service';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly jwtUtilityService: JwtUtilityService,
        private readonly userService: UserService
    ) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.json({ message: 'Invalid token' });
        }

        const [bearer, token] = authHeader.split(' ');
        if (bearer !== 'Bearer' || !token) {
            return res.json({ message: 'Invalid token' });
        }

        try {
            const decoded = this.jwtUtilityService.verifyAccessToken(token);
            req['userData'] = (await this.userService.find({ email: decoded.email }))["_doc"]
            next();
        } catch (err) {
            return res.json({ message: 'Invalid token' });
        }
    }
}