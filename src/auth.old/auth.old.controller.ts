import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthOldService } from './auth.old.service';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { LocalAuthGuard } from './local/local-auth.guard';
import { GoogleOAuthGuard } from './google/google-oauth.guard';

@Controller('auth')
export class AuthOldController {
  constructor(private authOldService: AuthOldService) {}

  // Private
  @UseGuards(LocalAuthGuard)
  @Post('loginPrivate')
  async loginPrivate(@Request() req) {
    return this.authOldService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profilePrivate')
  getProfilePrivate(@Request() req) {
    return req.user;
  }

  // Public
  @Get('loginPublic')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Request() req) {}

  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Request() req) {
    return this.authOldService.googleLogin(req);
  }
}
