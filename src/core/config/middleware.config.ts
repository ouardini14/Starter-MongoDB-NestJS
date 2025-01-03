import { MiddlewareConsumer } from '@nestjs/common';
import { PermitedRoutes } from '../constants/permited-routes';
import { AuthProviderMiddleware } from '../middlewares/auth-provider.middleware';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { LanguageMiddleware } from '../middlewares/lang.middleware';

export const configureMiddlewares = (consumer: MiddlewareConsumer) => {
    consumer
        .apply(AuthMiddleware)
        .exclude(...PermitedRoutes)
        .forRoutes('*');

    consumer
        .apply(LanguageMiddleware)
        .forRoutes('*');

    consumer
        .apply(AuthProviderMiddleware)
        .forRoutes('*');
};
