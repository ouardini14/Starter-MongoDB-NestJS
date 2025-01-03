import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Lang } from '../enums/lang-enum';

@Injectable()
export class LanguageMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const acceptLanguage = req.headers['accept-language'];
        let lang = acceptLanguage?.split(',')[0]?.split('-')[0] || 'en'
        let userlang
        lang == "ar " ? userlang = Lang.ARABIC : lang == "fr " ? userlang = Lang.FRENCH : userlang = Lang.ENGLISH
        req['userlang'] = userlang
        next();
    }
}
