import { user_role } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(4, 20, {
    message: 'Username must be between 4 and 20 characters',
  })
  @Transform(({ value }) => value.trim())
  username: string;

  @IsString()
  @IsEmail({}, { message: 'Invalid email' })
  @Transform(({ value }) => value.trim())
  email: string;

  @IsString()
  @Length(6, 20, {
    message: 'Password must be between 6 and 20 characters',
  })
  @Transform(({ value }) => value.trim())
  password: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  fullName: string;
}
