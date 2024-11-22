import { IsEmail, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsString()
  @Length(8, 20, {
    message: 'Password must be between 8 and 20 characters',
  })
  password: string;
}
