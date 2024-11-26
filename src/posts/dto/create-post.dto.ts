import { IsArray, IsString, Length } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @Length(6, 150, { message: 'Title is too short or too long' })
  title: string;

  @IsString()
  @Length(6, 100, { message: 'Description is too short or too long' })
  description: string;

  @IsString()
  content: string;

  @IsArray({
    message: 'Tags must be an array of strings',
  })
  categories: string[];
}
