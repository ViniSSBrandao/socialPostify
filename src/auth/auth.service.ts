import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, SignupDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable({})
export class AuthService {
  constructor(private jwt: JwtService, private prisma: PrismaService) {}
  async signin({ email, password }: AuthDto): Promise<string> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        throw new UnauthorizedException('incorrect user or password');
      }

      const testPassword = await argon.verify(user.password, password);
      console.log(testPassword);
      if (!testPassword) {
        throw new UnauthorizedException('incorrect user or password');
      }
      return this.signtoken({ userId: user.id, email: user.email });
    } catch (error) {}
  }
  async signup({ email, password, avatar, name }: SignupDto): Promise<string> {
    const hashedPassword = await argon.hash(password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          avatar,
          name,
        },
      });
      return this.signtoken({ userId: user.id, email: user.email });
    } catch (error) {
      throw new ForbiddenException('Email already in use');
    }
  }

  async signtoken({
    userId,
    email,
  }: {
    userId: number;
    email: string;
  }): Promise<string> {
    const payload = { sub: userId, email };
    return this.jwt.signAsync(payload, {
      expiresIn: '1d',
      secret: process.env.JWT_SECRET,
    });
  }
}
