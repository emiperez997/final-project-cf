import { IsOptional, IsString } from 'class-validator';

export class FilterPostsDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  author: string;

  @IsString()
  @IsOptional()
  category: string;
}
