import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('test')
export class UserController {
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findUser() {
    return 'userInfo';
  }
}
