import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { UsersService } from '../users/users.service';
import { LoginPrivateDto } from './dto/login.private.dto';
import { LoginPublicDto } from './dto/login.public.dto';
import { JwtHelperService } from '../common/jwt/jwt.helper.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtHelperService: JwtHelperService,
  ) {}
  async signInPrivate(data: LoginPrivateDto) {
    // Check if user exists
    const user = await this.usersService.findByEmail(data.email);
    if (!user) throw new BadRequestException('User does not exist');
    const passwordMatches = await argon2.verify(user.password, data.password);
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    const tokens = await this.jwtHelperService.getTokens(user._id, user.email);
    await this.updateRefreshToken(user._id, tokens.refreshToken);
    tokens["id"] = user._id;
    return tokens;
  }

  async signInPublic(req) {
    // Check if user exists
    let user = await this.usersService.findByEmail(req.user.email);
    if (!user) {
      // first signin, create public user
      user = await this.usersService.create({
        type: 'public',
        fullname: req.user.firstName + ' ' + req.user.lastName,
        company: '',
        address: '',
        password: 'none',
        refreshToken: '',
        avatar: req.user.picture,
        email: req.user.email,
      });
    }
    const tokens = await this.jwtHelperService.getTokens(user._id, user.email);
    await this.updateRefreshToken(user._id, tokens.refreshToken);
    return { fullname: user.fullname, avatar: user.avatar, tokens };
  }

  async logout(userId: string) {
    return this.usersService.update(userId, { refreshToken: null });
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.jwtHelperService.hashData(
      refreshToken,
    );
    await this.usersService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findById(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.jwtHelperService.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
