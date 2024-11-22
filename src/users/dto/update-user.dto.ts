import { IsEnum, IsOptional, IsString } from 'class-validator';
import { user_role } from '@prisma/client';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  fullName: string;

  @IsEnum(user_role)
  @IsOptional()
  role: user_role;
}
