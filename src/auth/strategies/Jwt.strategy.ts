import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "Hide me",
    });
  }

  async validate(payload: any) {
    const { sub } = payload;
    const user = await this.authService.validateUserById(sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}