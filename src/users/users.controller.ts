import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { user_role } from '@prisma/client';
import { AuthGuard } from '@/common/guards/auth.guard';
import { Auth } from '@/common/decorators/auth.decorator';
import { ActiveUser } from '@/common/decorators/active-user.decorator';
import { IUserActive } from '@/common/interfaces/user-active.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Auth(user_role.admin, user_role.user)
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @ActiveUser() user: IUserActive,
  ) {
    if (user.role === user_role.user && user.id !== id) {
      throw new BadRequestException('You cannot update other users');
    }

    return this.usersService.update(id, updateUserDto);
  }

  @Patch(':id/role')
  @Auth(user_role.admin)
  updateRole(
    @Param('id') id: string,
    @Body('role') role: user_role,
    @ActiveUser() user: IUserActive,
  ) {
    if (user.id === id) {
      throw new InternalServerErrorException('You cannot change your own role');
    }

    return this.usersService.updateRole(id, role);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post('login')
  login(@Body(ValidationPipe) loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }
}
