import { RequestMethod } from "@nestjs/common";

const prefix = "";

export const PermitedRoutes = [
    { path: `${prefix}/api-docs`, method: RequestMethod.GET },
    { path: `${prefix}/auth/login`, method: RequestMethod.POST },
    { path: `${prefix}/auth/register`, method: RequestMethod.POST },
    { path: `${prefix}/auth/refresh`, method: RequestMethod.GET },
    { path: `${prefix}/auth/register-company`, method: RequestMethod.POST },
    { path: `${prefix}/auth/verify-access-code`, method: RequestMethod.POST },
    { path: `${prefix}/auth/enable-user`, method: RequestMethod.POST },
    { path: `${prefix}/auth/set-password`, method: RequestMethod.POST },
    { path: `${prefix}/auth/password-recover`, method: RequestMethod.POST },
]