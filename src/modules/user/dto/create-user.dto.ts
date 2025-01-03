import { IsEmail, IsNotEmpty, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}
