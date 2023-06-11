import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { UsersModule } from '../users/users.module';
import { JwtHelperModule } from '../common/jwt/jwt.helper.module';
import { JwtHelperService } from '../common/jwt/jwt.helper.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, JwtHelperModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtHelperService,
    JwtService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}
