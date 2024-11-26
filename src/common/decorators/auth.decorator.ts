import { applyDecorators, UseGuards } from '@nestjs/common';
import { user_role } from '@prisma/client';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { Roles } from './roles.decorator';

export function Auth(...roles: user_role[]) {
  return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RoleGuard));
}
