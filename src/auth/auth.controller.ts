import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, SignupDto } from './dto';
@Controller('')
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Post('user')
  async signup(@Body() dto: SignupDto) {
    return this.authservice.signup(dto);
  }

  @Post('signin')
  async signin(@Body() dto: AuthDto) {
    return this.authservice.signin(dto);
  }
}
