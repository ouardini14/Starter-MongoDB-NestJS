import { Controller, Post, Body, Get, Param, Patch, Delete, Headers, HttpStatus, Res, Query } from "@nestjs/common";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { UpdateUserDto } from "../user/dto/update-user.dto";
import { AuthService } from "./auth.service";
import { ErrorServiceResponse, HttpResponseBuilder, SuccefulServiceResponse } from "http-response-utils";
import { Lang } from "src/core/enums/lang-enum";
import { User } from "src/core/decorators/user.decorator";
import { User as UserType } from "../user/schemas/user.schema";
import { Language } from "src/core/decorators/lang.decorator";
import { AuthProvider } from "src/core/enums/auth-providers.enum";
import { UseAuthProvider } from "src/core/decorators/auth-provider.decorator";


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("register")
  async initialRegister(@Body() data: any, @Language() userlang: Lang, @UseAuthProvider() provider: AuthProvider) {
    const res = await this.authService.initialRegisterByProvider(data, provider, userlang);
    return HttpResponseBuilder(res)
  }

  @Post("login")
  async login(@Body() data: any, @Language() userlang: Lang, @UseAuthProvider() provider: AuthProvider) {
    const res = await this.authService.loginByProvider(data, provider, userlang);
    return HttpResponseBuilder(res)
  }


  @Get("refresh")
  async refreshToken(@Headers('authorization') authorization: string) {
    if (!authorization) return HttpResponseBuilder(ErrorServiceResponse('Authorization header is missing'));
    const token = authorization.split(' ')[1];
    return HttpResponseBuilder(this.authService.refreshToken(token))
  }

  @Get("user-details")
  async getUserData(@User() user?: Partial<UserType>) {
    return HttpResponseBuilder(SuccefulServiceResponse(user))
  }

  @Get("send-verification")
  async sendMailVerification(@User() user?: Partial<UserType>) {
    const res = await this.authService.sendMailVerification(user)
    return HttpResponseBuilder(SuccefulServiceResponse(res))
  }

  @Post("verification")
  async verifyUser(@Body('code') code:string) {
    const res = await this.authService.verifyAccount(code)
    return HttpResponseBuilder(SuccefulServiceResponse(res))
  }

  @Post("send-password-reset")
  async sendMailPasswordReset(@Body('email') email: string,@Language() lang:Lang) {
    const res = await this.authService.sendMailPasswordReset(email, lang)
    return HttpResponseBuilder(SuccefulServiceResponse(res))
  }

  @Post("reset-password")
  async resetPassword(@Body() data: {password:string,code:string}) {
    const res = await this.authService.passwordReset(data.code,data.password)
    return HttpResponseBuilder(SuccefulServiceResponse(res))
  }

}
