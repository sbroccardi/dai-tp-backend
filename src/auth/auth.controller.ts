import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { PrivateDto } from './dto/private.dto';
import { PublicDto } from './dto/public.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';

@ApiTags('auths')
@Controller('auths')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login for managers' })
  @ApiResponse({ status: 200, description: 'User logged in.' })
  @ApiResponse({ status: 401, description: 'User not found.' })
  @Post('loginPrivate')
  loginPrivate(@Body() data: PrivateDto) {
    return this.authService.signInPrivate(data);
  }

  @ApiOperation({ summary: 'Login for public' })
  @ApiResponse({ status: 200, description: 'User logged in.' })
  @ApiResponse({ status: 401, description: 'User not found.' })
  @Post('loginPublic')
  loginPublic(@Body() data: PublicDto) {
    return this.authService.signInPublic(data);
  }

  @ApiOperation({ summary: 'Log out user' })
  @ApiResponse({ status: 200, description: 'User logged out.' })
  @UseGuards(AccessTokenGuard)
  //@Get('logout')
  @Delete()
  logout(@Req() req: Request) {
    this.authService.logout(req.user['sub']);
  }

  @ApiOperation({ summary: 'Refresh token' })
  @ApiResponse({ status: 200, description: 'Token refreshed.' })
  @ApiResponse({ status: 401, description: 'User not found.' })
  @UseGuards(RefreshTokenGuard)
  //@Get('refresh')
  @Put()
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
