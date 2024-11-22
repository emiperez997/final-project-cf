import { user_role } from '@prisma/client';

export class User {
  id: string;
  username: string;
  email: string;
  password: string;
  fullName: string;
  role: user_role;
  createdAt: Date;
  updatedAt: Date;
}
