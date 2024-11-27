import { IsEnum, IsOptional, IsString } from 'class-validator';
import { user_role } from '@prisma/client';
import { Transform } from 'class-transformer';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  username: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  email: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  fullName: string;

  @IsEnum(user_role)
  @IsOptional()
  @Transform(({ value }) => value.trim())
  role: user_role;
}
