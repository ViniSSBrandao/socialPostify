import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthRepositories {
  constructor(private readonly prisma: PrismaService) {}
  async findUser(email) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  async createUser(
    email: string,
    password: string,
    avatar: string,
    name: string,
  ) {
    const user = await this.prisma.user.create({
      data: {
        email,
        password,
        avatar,
        name,
      },
    });
    return user;
  }
}
