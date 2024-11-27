import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { UsersService } from '@/users/users.service';

@Module({
  controllers: [AdminController],
  providers: [UsersService],
})
export class AdminModule {}
