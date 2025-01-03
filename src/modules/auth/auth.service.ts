import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { ErrorServiceResponse, SuccefulServiceResponse } from 'http-response-utils';
import { User } from '../user/schemas/user.schema';
import { AuthProvider } from 'src/core/enums/auth-providers.enum';
import { checkErrors, ErrorServiceResponseByLang, logErrorResponse, SuccessfulServiceResponseByLang } from 'src/core/utils/utils';
import { JwtUtilityService } from './jwt.service';
import { ILoginTokenPayload } from 'src/core/interfaces/token-login-payload.interface';
import { EmailService } from 'src/core/lib/third-party';
import * as bcrypt from 'bcrypt';
import { ErrorMessage } from 'src/core/enums/errors.enums';
import { Lang } from 'src/core/enums/lang-enum';
import { IAuthResponse } from 'src/core/interfaces/auth-response.interface';
import { UserStatus } from 'src/core/enums/user.statuses.enum';
import { SuccessMessage } from 'src/core/enums/success.enums';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtUtilityService,
        private readonly emailService: EmailService

    ) { }



    async initialRegisterByProvider(data: any, provider: AuthProvider, lang: Lang) {

        try {
            const registerMethod = this.providerRegisterMethods[provider];
            if (!registerMethod) throw new Error(`Unsupported provider: ${provider}`)
            return await registerMethod(data,lang);
        } catch (error) {
            return ErrorServiceResponseByLang(error, lang)
        }
    }

    async loginByProvider(data: any, provider: AuthProvider, lang: Lang) {
        try {
            const loginMethod = this.providerLoginMethods[provider];
            if (!loginMethod) throw new Error(`Unsupported provider: ${provider}`)
            return await loginMethod(data, lang);
        } catch (error) {
            return ErrorServiceResponseByLang(error, lang)
        }
    }

    async initialRegisterWithEmail(user: CreateUserDto,lang:Lang) {
        try {
            const existingUser = await this.userService.find({ email: user.email })
            const errorMessage = checkErrors({ existingUser });
            if (!errorMessage) {
                const saltOrRounds = 10;
                const hash = await bcrypt.hash(user.password, saltOrRounds);
                const newUser = await this.userService.create({ ...user, password: hash, lastSignedIn: new Date() });
                this.emailService.sendWelcomeEmail(newUser.email, newUser.preferdLang)
                return SuccefulServiceResponse(this.generateAuthResponse(newUser))
            }
            return ErrorServiceResponseByLang(errorMessage, lang);

        } catch (error) {
            return ErrorServiceResponseByLang(error, lang)
        }
    }

    async initialRegisterWithGoogle(data: any,lang:Lang) {
        const idToken = data.idToken
        try {
            const payload = await this.jwtService.verifyGoogleToken(idToken)
            const googleId = payload['sub'];
            const email = payload['email'];

            let user = await this.userService.find({ email, userProviderId:googleId });
            if (!user) {
                user = await this.userService.create({
                    email,
                    userProviderId: googleId,
                    isVerified:true,
                    authProvider: AuthProvider.Google,
                });
            }

            return SuccefulServiceResponse(this.generateAuthResponse(user));

        } catch (error) {
            return ErrorServiceResponseByLang(error, lang)
        }
    }

    private async loginWithGoogle(data:any, lang: Lang) {
        const idToken = data.idToken
        try {
            const payload = await this.jwtService.verifyGoogleToken(idToken)
            const googleId = payload['sub'];
            const email = payload['email'];
            let user = await this.userService.find({ email, userProviderId: googleId });
            const errorMessage = await checkErrors({ emailNotFound: user, accountIsSuspended: user });
            if (!errorMessage && user) {
                user = await this.userService.update({ _id: user._id, lastSignedIn: new Date() })
                return SuccefulServiceResponse(this.generateAuthResponse(user))
            }
            return errorMessage ? ErrorServiceResponseByLang(errorMessage, lang) : ErrorServiceResponseByLang(ErrorMessage.DEFAULT_ERROR, lang)
        } catch (error) {
            return logErrorResponse(error, lang)
        }
    }

    private async loginWithEmail(userData: { email: string, password: string }, lang: Lang) {
        try {
            let user = await this.userService.find({ email: userData.email }, "+password");
            const errorMessage = await checkErrors({ emailNotFound: user, accountIsSuspended: user });
            if (!errorMessage && user && await bcrypt.compare(userData?.password, user.password)) {
                user = await this.userService.update({ _id: user._id, lastSignedIn: new Date() })
                return SuccefulServiceResponse(this.generateAuthResponse(user))
            }
            return errorMessage ? ErrorServiceResponseByLang(errorMessage, lang) : ErrorServiceResponseByLang(ErrorMessage.PASSWORD_INCORRECT, lang)
        } catch (error) {
            return logErrorResponse(error, lang)
        }
    }

    async sendMailVerification(user:Partial<User>){
        try {
            const errorMessage = await checkErrors({ userNotFound: user, accountIsSuspended: user });
            if (!errorMessage && user && user.authProvider == AuthProvider.Email) {
                const code=this.jwtService.generateVerficationCode(user.email)
                const url = process.env.FRONTEND_URL+"/verification?code="+code
                await this.emailService.sendVerificationEmail(user.email,user.preferdLang,url)
                return SuccessfulServiceResponseByLang(SuccessMessage.VERIFICATION_EMAIL_SENT,user.preferdLang)
            }
            return errorMessage ? ErrorServiceResponseByLang(errorMessage) : ErrorServiceResponseByLang(ErrorMessage.DEFAULT_ERROR, user.preferdLang)
        } catch (error) {
            return logErrorResponse(error)
        }
    }

    async verifyAccount(code:string) {
        try {
            const payload=this.jwtService.verifyVerificationCode(code)
            let user=await this.userService.find({email:payload?.email})
            if(payload && user && !user.isVerified){
               user= await this.userService.update({_id:user._id,isVerified:true})
                return SuccefulServiceResponse({
                    email: user.email,
                    authProvider: user.authProvider,
                    status: user.status,
                    isVerified: user.isVerified,
                    type: user.type,
                    goal: user.goal,
                    preferdLang: user.preferdLang,
                })
            }
            return ErrorServiceResponseByLang(ErrorMessage.DEFAULT_ERROR)
         } catch (error) {
            return logErrorResponse(error)
        }
    }

    async sendMailPasswordReset(email:string,lang:Lang) {
        try {
            const user= await this.userService.find({email})
            const errorMessage = await checkErrors({ userNotFound: user, accountIsSuspended: user });
            if (!errorMessage && user && user.authProvider==AuthProvider.Email) {
                const code = this.jwtService.generatePasswordResetCode(user.email)
                const url = process.env.FRONTEND_URL + "/password-reset?code=" + code
                await this.emailService.sendPasswordRestEmail(user.email, user.preferdLang, url)
                return SuccessfulServiceResponseByLang(SuccessMessage.RESET_LINK_SENT, lang)
            }
            return errorMessage ? ErrorServiceResponseByLang(errorMessage, lang) : ErrorServiceResponseByLang(ErrorMessage.DEFAULT_ERROR, lang)
        } catch (error) {
            return logErrorResponse(error)
        }
    }


    async passwordReset(code: string,password:string) {
        try {
            const payload = this.jwtService.verifyResetPasswordCode(code)
            let user = await this.userService.find({ email: payload?.email })
            if (payload && user && user.status!=UserStatus.SUSPENDED) {
                const saltOrRounds = 10;
                const hash = await bcrypt.hash(password, saltOrRounds);
                user = await this.userService.update({ _id: user._id ,password:hash })
                this.emailService.sendPasswordHasChangedEmail(user.email,user.preferdLang)
                return SuccessfulServiceResponseByLang(SuccessMessage.PASSWORD_UPDATED)
            }
            return ErrorServiceResponseByLang(ErrorMessage.DEFAULT_ERROR)
        } catch (error) {
            return logErrorResponse(error)
        }
    }


    refreshToken(refreshToken: string) {
        try {
            let payload = this.jwtService.verifyRefreshToken(refreshToken)
            if (payload) {
                payload = {
                    email: payload.email,
                    status: payload.status,
                    type: payload.type
                }
                return SuccefulServiceResponse({
                    accessToken: this.jwtService.generateLoginAccessToken(payload),
                    refreshToken: this.jwtService.generateRefreshToken(payload),
                })
            }
            return ErrorServiceResponse("Invalid Refresh Token")
        } catch (error) {
            return logErrorResponse(error)
        }
    }

    private generateAuthResponse(user: User) :IAuthResponse {
        const payload: ILoginTokenPayload = {
            email: user.email,
            status: user.status,
            type: user.type
        }
        return {
            accessToken: this.jwtService.generateLoginAccessToken(payload),
            refreshToken: this.jwtService.generateRefreshToken(payload),
            userInfo: {
                email: user.email,
                authProvider: user.authProvider,
                status: user.status,
                isVerified:user.isVerified,
                type: user.type,
                goal: user.goal,
                preferdLang: user.preferdLang,
            }
        }

    }

    private providerLoginMethods: Record<AuthProvider, (data: any, lang: Lang) => Promise<any>> = {
        [AuthProvider.Email]: this.loginWithEmail.bind(this),
        [AuthProvider.Google]: this.loginWithGoogle.bind(this),
    };


    private providerRegisterMethods: Record<AuthProvider, (data: any, lang: Lang) => Promise<any>> = {
        [AuthProvider.Email]: this.initialRegisterWithEmail.bind(this),
        [AuthProvider.Google]: this.initialRegisterWithGoogle.bind(this),
    };
}
