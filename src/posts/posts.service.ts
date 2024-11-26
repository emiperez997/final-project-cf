import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { IUserActive } from '@/common/interfaces/user-active.interface';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.post.findMany({
      include: {
        author: {
          select: {
            full_name: true,
            email: true,
          },
        },
        categories: {
          select: {
            category: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async create(createPostDto: CreatePostDto, userId: string) {
    return this.prisma.post.create({
      data: {
        ...createPostDto,
        author: {
          connect: {
            id: userId,
          },
        },
        categories: {
          create: createPostDto.categories.map((category) => ({
            category: {
              connectOrCreate: {
                where: { name: category.trim().toLowerCase() },
                create: { name: category.trim().toLowerCase() },
              },
            },
          })),
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            full_name: true,
            email: true,
          },
        },
        categories: {
          select: {
            category: true,
          },
        },
      },
    });
  }

  async update(id: string, updatePostDto: UpdatePostDto, userId: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        categories: {
          select: {
            category: true,
          },
        },
      },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.authorId !== userId) {
      throw new UnauthorizedException('You are not the author of this post');
    }

    if (updatePostDto.categories) {
      // Remove categories if not present in the updatePostDto
      await this.prisma.post_category.deleteMany({
        where: {
          postId: id,
          NOT: {
            category: {
              name: {
                in: updatePostDto.categories,
              },
            },
          },
        },
      });

      // If categories is already present in the post, do not create them again
      updatePostDto.categories = updatePostDto.categories.filter(
        (category) =>
          !post.categories.some(
            (postCategory) => postCategory.category.name === category,
          ),
      );
    }

    return this.prisma.post.update({
      where: { id },
      data: {
        ...updatePostDto,
        categories: {
          create: updatePostDto.categories.map((category) => ({
            category: {
              connectOrCreate: {
                where: { name: category.trim().toLowerCase() },
                create: { name: category.trim().toLowerCase() },
              },
            },
          })),
        },
      },
      include: {
        categories: {
          select: {
            category: {
              select: {
                name: true,
              },
            },
          },
        },
        author: {
          select: {
            full_name: true,
            email: true,
          },
        },
      },
    });
  }

  async remove(id: string, user: IUserActive) {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.authorId !== user.id && user.role !== 'admin') {
      throw new UnauthorizedException('You are not the author of this post');
    }

    await this.prisma.post_category.deleteMany({
      where: { postId: id },
    });

    return await this.prisma.post.delete({
      where: { id },
    });
  }
}
