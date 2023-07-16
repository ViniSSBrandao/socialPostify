import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, SignupDto } from './dto';
import * as argon from 'argon2';
@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    const hashedPassword = argon.hash(dto.password);
    return this.authservice.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: AuthDto) {
    console.log(dto);

    return this.authservice.signin(dto);
  }
}
