import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  Query,
  Req,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AccessTokenGuard } from '../common/guards/accessToken.guard';
import { ConfirmCodeDto } from '../users/dto/confirm-code.dto';
import { ChangePasswordDto } from '../users/dto/change-password.dto';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private readonly logger = new Logger(UsersController.name);

  @Post()
  @ApiOperation({ summary: 'Register private user' })
  @ApiResponse({ status: 201, description: 'User created.' })
  @ApiResponse({ status: 400, description: 'User already exists.' })
  signup(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signUpPrivate(createUserDto);
  }

  @Get('resetpassword')
  @ApiOperation({ summary: 'Reset password' })
  @ApiResponse({ status: 200, description: 'Reset password email sent.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  resetPassword(@Query('email') email: string) {
    //TODO: Add validation
    if (!email) throw new BadRequestException('email address missing.');
    this.usersService.resetPassword(email);
    return 'EMAIL SENT';
  }

  @Post('confirmcode')
  @ApiOperation({ summary: 'Confirm reset code' })
  @ApiResponse({ status: 200, description: 'Code confirmed, get User ID' })
  @ApiResponse({ status: 400, description: 'Invalid code.' })
  confirmCode(@Body() confirmCodeDto: ConfirmCodeDto) {
    //TODO: Add validation
    const userId = this.usersService.confirmCode(
      confirmCodeDto.email,
      confirmCodeDto.token,
    );
    return userId;
  }

  @Post('changepassword')
  @ApiOperation({ summary: 'Change password' })
  @ApiResponse({ status: 200, description: 'Password changed.' })
  @ApiResponse({ status: 400, description: 'User not found.' })
  @ApiResponse({ status: 404, description: 'Invalid code.' })
  changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    this.usersService.changePassword(
      changePasswordDto.userId,
      changePasswordDto.newPassword,
      changePasswordDto.token,
    );
    return 'PASSWORD CHANGED';
  }

  @Get()
  @ApiOperation({ summary: 'Get users' })
  @ApiResponse({ status: 200, description: 'List of users.' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('purchases')
  @ApiOperation({ summary: 'Get user purchases' })
  @ApiResponse({ status: 200, description: 'List of purchases.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @UseGuards(AccessTokenGuard)
  getPurchases(@Req() req: Request) {
    //TODO: Add validation.
    const userId = req.user['sub'];
    return this.usersService.findPurchasesByUserId(userId);
  }

  @Get('me')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'User profile.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @UseGuards(AccessTokenGuard)
  findMe(@Req() req: Request) {
    //TODO: Add validation.
    const userId = req.user['sub'];
    return this.usersService.findById(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an user profile' })
  @ApiResponse({ status: 200, description: 'User profile.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @UseGuards(AccessTokenGuard)
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Put()
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({ status: 200, description: 'User updated.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource not found.' })
  @UseGuards(AccessTokenGuard)
  update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    //TODO: Add validation.
    const userId = req.user['sub'];
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, description: 'User deleted.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @UseGuards(AccessTokenGuard)
  remove(@Req() req: Request) {
    //TODO: Add validation.
    const userId = req.user['sub'];
    return this.usersService.remove(userId);
  }
}
