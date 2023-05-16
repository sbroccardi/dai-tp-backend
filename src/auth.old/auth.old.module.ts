import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '../users/users.module';
import { AuthOldController } from './auth.old.controller';
import { LocalStrategy } from './local/local.strategy';
import { JwtStrategy } from './jwt/jwt.strategy';
import { AuthOldService } from './auth.old.service';
import { GoogleStrategy } from './google/google.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      //global: true,
      secret: 'SECRET', //this.configService.get<string>('SECRET'),
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [AuthOldService, LocalStrategy, JwtStrategy, GoogleStrategy],
  controllers: [AuthOldController],
  exports: [AuthOldService],
})
export class AuthOldModule {}
