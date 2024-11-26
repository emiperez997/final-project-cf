import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Auth } from '@/common/decorators/auth.decorator';
import { user_role } from '@prisma/client';
import { ActiveUser } from '@/common/decorators/active-user.decorator';
import { IUserActive } from '@/common/interfaces/user-active.interface';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @Auth(user_role.user)
  create(
    @Body(ValidationPipe) createPostDto: CreatePostDto,
    @ActiveUser() user: IUserActive,
  ) {
    return this.postsService.create(createPostDto, user.id);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  @Auth(user_role.user)
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updatePostDto: UpdatePostDto,
    @ActiveUser() user: IUserActive,
  ) {
    return this.postsService.update(id, updatePostDto, user.id);
  }

  @Delete(':id')
  @Auth(user_role.user, user_role.admin)
  remove(@Param('id') id: string, @ActiveUser() user: IUserActive) {
    return this.postsService.remove(id, user);
  }
}
