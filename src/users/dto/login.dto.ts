import { IsEmail, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsString()
  @Length(6, 20, {
    message: 'Password must be between 6 and 20 characters',
  })
  password: string;
}
