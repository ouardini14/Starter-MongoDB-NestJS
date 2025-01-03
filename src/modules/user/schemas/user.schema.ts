import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDate, IsOptional } from 'class-validator';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { AuthProvider } from 'src/core/enums/auth-providers.enum';
import { Lang } from 'src/core/enums/lang-enum';
import { UserType } from 'src/core/enums/user-types.enum';
import { UserStatus } from 'src/core/enums/user.statuses.enum';

@Schema({ timestamps: true })
export class User extends Document {
    @ApiProperty({
        description: 'The email address of the user.',
        example: 'user@example.com',
    })
    @Prop({ required: true })
    email: string;

    @ApiProperty({
        description: 'The password of the user (stored as a hashed value).',
        example: 'hashed_password',
    })
    @Prop({ required: true, select: false })
    password: string;

    @ApiProperty({
        description: 'The authentication provider used by the user.',
        enum: AuthProvider,
        default: AuthProvider.Email,
        example: AuthProvider.Email,
    })
    @Prop({ default: AuthProvider.Email })
    authProvider: AuthProvider;

    @ApiProperty({
        description: 'The ID provided by the authentication provider, if applicable.',
        example: 'google_user_id_12345',
    })
    @Prop({ default: "" })
    userProviderId: string;

    @ApiProperty({
        description: 'The status of the user account.',
        enum: UserStatus,
        default: UserStatus.REGISTRATION,
        example: UserStatus.ACTIF,
    })
    @Prop({ default: UserStatus.REGISTRATION })
    status: UserStatus;

    @ApiProperty({
        description: 'Is user verified',
        default:false,
        example: false,
    })
    @Prop({ default: false})
    isVerified: boolean;

    @ApiProperty({
        description: 'The type of user account.',
        enum: UserType,
        default: UserType.TYPE_INDIVIDUAL,
        example: UserType.TYPE_ORGANIZATION,
    })
    @Prop({ default: UserType.TYPE_INDIVIDUAL })
    type: UserType;


    @ApiProperty({
        description: 'The preferred language of the user.',
        enum: Lang,
        default: Lang.ENGLISH,
        example: Lang.FRENCH,
    })
    @Prop({ default: Lang.ENGLISH })
    preferdLang: Lang;


    @ApiProperty({
        description: 'The date and time the user was logged in.',
        example: '2025-01-01T12:00:00Z',
    })
    @IsOptional()
    @IsDate()
    lastSignedIn?: Date;
    
    @ApiProperty({
        description: 'The date and time the user was created.',
        example: '2025-01-01T12:00:00Z',
    })
    @Prop({ default: Date.now })
    @IsDate()
    createdAt?: Date;

    @ApiProperty({
        description: 'The date and time the user was last updated.',
        example: '2025-01-02T12:00:00Z',
    })
    @Prop()
    @IsDate()
    updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
