import { Post } from '@/posts/entities/post.entity';

export class Category {
  id: string;
  name: string;
  description: string;
  posts: Post[];
  createdAt: Date;
  updatedAt: Date;
}
