import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';

@ApiTags('auths')
@Controller('auths')
export class AuthController {
  constructor(private authService: AuthService) { }

  /*   @Post('signup')
    @ApiOperation({ summary: 'Register user' })
    signup(@Body() createUserDto: CreateUserDto) {
      return this.authService.signUp(createUserDto);
    } */

  @Post('loginPrivate')
  @ApiOperation({ summary: 'Private login' })
  @ApiResponse({ status: 401, description: 'Invalid username or password supplied.' })
  signin(@Body() data: AuthDto) {
    return this.authService.signIn(data);
  }

  @Get('loginPublic')
  @ApiOperation({ summary: 'Public login' })
  @ApiResponse({ status: 401, description: 'Cant log in with Google.' })
  login() {
    return '';
  }

  @UseGuards(RefreshTokenGuard)
  @Put()
  @ApiOperation({ summary: 'Refresh token' })
  @ApiResponse({ status: 401, description: 'Refresh token missing or invalid.' })
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @UseGuards(AccessTokenGuard)
  @Delete()
  @ApiOperation({ summary: 'Logout' })
  logout(@Req() req: Request) {
    this.authService.logout(req.user['sub']);
  }

}
