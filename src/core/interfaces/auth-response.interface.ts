import { User } from "src/modules/user/schemas/user.schema"

export interface IAuthResponse {
    accessToken:string
    refreshToken:string
    userInfo:Partial<User>
}