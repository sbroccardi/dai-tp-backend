import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET',
    });
  }

  async validate(payload: any) {
    //TODO: database lookup to token revocation or extract more information
    //about the user, resulting in a more enriched user object being available
    //in our Request.
    return {
      message: 'User information from ScreenSpace',
      user: {
        userId: payload.sub,
        username: payload.username,
        picture: '',
        lastName: '',
        firstName: '',
        email: '',
      },
    };
  }
}
