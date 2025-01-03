import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Language = createParamDecorator(
    async (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const userlang = request?.userlang;
        return userlang 
    },
);
