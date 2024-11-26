import { user_role } from '@prisma/client';
import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(4, 20, {
    message: 'Username must be between 4 and 20 characters',
  })
  username: string;

  @IsString()
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsString()
  @Length(6, 20, {
    message: 'Password must be between 6 and 20 characters',
  })
  password: string;

  @IsString()
  fullName: string;
}
