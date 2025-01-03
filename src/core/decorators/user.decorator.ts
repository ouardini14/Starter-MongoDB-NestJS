import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
    async (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const userData = request?.userData;
        return { ...userData }
    },
);
