import { Transform } from 'class-transformer';
import { IsEmail, IsString, Length } from 'class-validator';

export class LoginDto {
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
}
