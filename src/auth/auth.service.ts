import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, SignupDto } from './dto';
import * as argon from 'argon2';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signin({ email, password }: AuthDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const testPassword = await argon.verify(user.password, password);
      console.log(testPassword);
      if (!testPassword) {
        throw new UnauthorizedException('incorrect password');
      }
      return user;
    } catch (error) {}
  }
  async signup({ email, password, avatar, name }: SignupDto) {
    const hashedPassword = await argon.hash(password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          avatar,
          name,
        },
        select: {
          email: true,
          name: true,
        },
      });
      return user;
    } catch (error) {
      throw new ForbiddenException('Email already in use');
    }
  }
}
