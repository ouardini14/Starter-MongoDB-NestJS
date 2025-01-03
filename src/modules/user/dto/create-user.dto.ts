import { IsEmail, IsNotEmpty, IsEnum, IsOptional, IsString } from 'class-validator';
import { AuthProvider } from 'src/core/enums/auth-providers.enum';
import { Lang } from 'src/core/enums/lang-enum';
import { UserGoal } from 'src/core/enums/user-goal.enum';
import { UserType } from 'src/core/enums/user-types.enum';
import { UserStatus } from 'src/core/enums/user.statuses.enum';

export class CreateUserDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}
