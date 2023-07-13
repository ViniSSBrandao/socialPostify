import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signin() {
    return { a: 'lol', b: 'aaaaa' };
  }
  signup() {
    return 'lul';
  }
}
