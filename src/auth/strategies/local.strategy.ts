import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from 'src/user/user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      usernameField: 'email',
    });
  }
  async validate(loginDto: LoginUserDto) {
    return from(this.userService.logIn(loginDto));
  }
}
