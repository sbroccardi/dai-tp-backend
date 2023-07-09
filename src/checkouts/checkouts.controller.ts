import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CheckoutsService } from './checkouts.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@ApiBearerAuth()
@ApiTags('checkouts')
@Controller('checkouts')
export class CheckoutsController {
  constructor(private readonly checkoutsService: CheckoutsService) {}

  @Post()
  @ApiOperation({ summary: 'Checkout' })
  @ApiResponse({ status: 201, description: 'Successful operation.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @UseGuards(AccessTokenGuard)
  async create(@Body() createCheckoutDto: CreateCheckoutDto) {
    const checkout = await this.checkoutsService.create(createCheckoutDto);
    if (checkout === null) throw new BadRequestException();
    return checkout;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get checkout' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Checkout not found.' })
  @UseGuards(AccessTokenGuard)
  findOne(@Param('id') id: string) {
    return this.checkoutsService.findById(id);
  }
}
