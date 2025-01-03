import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UseAuthProvider = createParamDecorator(
    async (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const authProvider = request?.authProvider;
        return authProvider 
    },
);
