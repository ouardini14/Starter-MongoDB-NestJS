import { UserType } from "../enums/user-types.enum"
import { UserStatus } from "../enums/user.statuses.enum"

export interface ILoginTokenPayload{
    email:string
    status: UserStatus
    type: UserType
}