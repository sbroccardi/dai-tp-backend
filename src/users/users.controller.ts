import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

//@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 409, description: 'User already exists.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('resetpassword')
  @ApiOperation({ summary: 'Reset password' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  resetPassword() {
    //TODO:
    return 'RESET PASSWORD NOT IMPLEMENTED';
  }

  @Post('confirmcode')
  @ApiOperation({ summary: 'Confirm code sent' })
  @ApiResponse({ status: 400, description: 'Invalid code.' })
  confirmCode() {
    return 'CONFIRM CODE NOT IMPLEMENTED';
  }

  @Post(':id/changepassword')
  @ApiOperation({ summary: 'Change password' })
  @ApiResponse({ status: 400, description: 'User not found.' })
  @ApiResponse({ status: 404, description: 'Invalid code.' })
  changePassword() {
    //TODO:
    return 'CHANGE PASSWORD NOT IMPLEMENTED';
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an user profile' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Get(':id/me')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  findMe(@Param('id') id: string) {
    //TODO: Add validation.
    return this.usersService.findById(id);
  }

  @UseGuards(AccessTokenGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource not found.' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    //TODO: Add validation.
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  remove(@Param('id') id: string) {
    //TODO: Add validation.
    return this.usersService.remove(id);
  }

  @Get(':id/purchases')
  @ApiOperation({ summary: 'Get user purchases' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  getPurchases(@Param('id') id: string) {
    //TODO: Add validation.
    return this.usersService.findPurchasesById(id);
  }
}
