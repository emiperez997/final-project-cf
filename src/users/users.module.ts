import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '@/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { environment } from '@/config/environment';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: environment.JWT.SECRET,
      signOptions: { expiresIn: environment.JWT.EXPIRES_IN },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
