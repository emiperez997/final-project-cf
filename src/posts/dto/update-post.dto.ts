import { IsArray, IsOptional, IsString, Length } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsArray({
    message: 'Tags must be an array of strings',
  })
  @IsOptional()
  categories: string[];
}
