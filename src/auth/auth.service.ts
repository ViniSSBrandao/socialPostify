import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, SignupDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { AuthRepositories } from './auth.repositories';

@Injectable({})
export class AuthService {
  constructor(
    private jwt: JwtService,
    private authRepositories: AuthRepositories,
  ) {}
  async signin({
    email,
    password,
  }: AuthDto): Promise<{ access_token: string }> {
    try {
      const user = await this.authRepositories.findUser(email);
      if (!user) {
        throw new UnauthorizedException('incorrect user or password');
      }

      const testPassword = await argon.verify(user.password, password);

      if (!testPassword) {
        throw new UnauthorizedException('incorrect user or password');
      }
      return this.signToken({ userId: user.id, email: user.email });
    } catch (error) {
      return error;
    }
  }
  async signup({
    email,
    password,
    avatar,
    name,
  }: SignupDto): Promise<{ access_token: string }> {
    const hashedPassword = await argon.hash(password);
    try {
      const user = await this.authRepositories.createUser(
        email,
        hashedPassword,
        avatar,
        name,
      );
      return this.signToken({ userId: user.id, email: user.email });
    } catch (error) {
      throw new ConflictException('Email already in use');
    }
  }

  async signToken({
    userId,
    email,
  }: {
    userId: number;
    email: string;
  }): Promise<{ access_token: string }> {
    const payload = { sub: userId, email };
    const token = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1d',
    });

    return { access_token: token };
  }
}
