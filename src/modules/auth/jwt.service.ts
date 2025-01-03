import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { TokensExpiration } from 'src/core/enums/tokens-expiration.enum';
import { ILoginTokenPayload } from 'src/core/interfaces/token-login-payload.interface';

@Injectable()
export class JwtUtilityService {
    private client = new OAuth2Client();

    constructor(private readonly jwtService: JwtService){}

    generateLoginAccessToken(payload:ILoginTokenPayload){
         return this.jwtService.sign(payload, { secret: process.env.LOGIN_SECRET_KEY, expiresIn: TokensExpiration.LOGIN })
    }

    generateRefreshToken(payload: ILoginTokenPayload) {
        return this.jwtService.sign(payload, { secret: process.env.REFRESH_SECRET_KEY, expiresIn:TokensExpiration.REFRESH }); 
    }

    generateVerficationCode(email: string) {
        return this.jwtService.sign({ email }, { secret: process.env.VERIFY_USER_SECRET_KEY, expiresIn: TokensExpiration.VERIFICATION })
    }
    
    generatePasswordResetCode(email: string) {
        return this.jwtService.sign({ email }, { secret: process.env.RESET_PASSWORD_SECRET_KEY, expiresIn: TokensExpiration.RESET_PASSWORD })
    }

    verifyAccessToken(token: string) {
        return this.jwtService.verify(token, { secret: process.env.LOGIN_SECRET_KEY})
    }

    verifyRefreshToken(token: string) {
        return this.jwtService.verify(token, { secret: process.env.REFRESH_SECRET_KEY })
    }

    verifyVerificationCode(token: string) {
        return this.jwtService.verify(token, { secret: process.env.VERIFY_USER_SECRET_KEY })
    }

    verifyResetPasswordCode(token: string) {
        return this.jwtService.verify(token, { secret: process.env.RESET_PASSWORD_SECRET_KEY })
    }

    async verifyGoogleToken(idToken: string): Promise<TokenPayload> {
        const ticket = await this.client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        return ticket.getPayload();
    }
    
}
