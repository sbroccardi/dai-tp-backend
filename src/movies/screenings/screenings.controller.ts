import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ScreeningsService } from './screenings.service';
import { CreateScreeningDto } from './dto/create-screening.dto';
import { UpdateScreeningDto } from './dto/update-screening.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@ApiBearerAuth()
@ApiTags('screenings')
@Controller('movies/:movieId/screenings')
export class ScreeningsController {
  constructor(private readonly screeningsService: ScreeningsService) {}

  @Post()
  @ApiOperation({ summary: 'Create screening' })
  @ApiResponse({ status: 201, description: 'Screening created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
  @ApiResponse({ status: 409, description: 'Screening already exists.' })
  @UseGuards(AccessTokenGuard)
  create(
    @Param('movieId') movieId: string,
    @Body() createScreeningDto: CreateScreeningDto,
  ) {
    return this.screeningsService.create(createScreeningDto);
  }

  @Get()
  @ApiOperation({ summary: 'List screenings' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
  @UseGuards(AccessTokenGuard)
  findAll(@Param('movieId') movieId: string) {
    return this.screeningsService.findByMovieId(movieId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get screening details' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Movie or screening not found.' })
  @UseGuards(AccessTokenGuard)
  findOne(@Param('movieId') movieId: string, @Param('id') id: string) {
    return this.screeningsService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update screening' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Movie or screening not found.' })
  @UseGuards(AccessTokenGuard)
  update(
    @Param('movieId') movieId: string,
    @Param('id') id: string,
    @Body() updateScreeningDto: UpdateScreeningDto,
  ) {
    return this.screeningsService.update(id, updateScreeningDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete screening' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Movie or screening not found.' })
  @UseGuards(AccessTokenGuard)
  remove(@Param('movieId') movieId: string, @Param('id') id: string) {
    return this.screeningsService.remove(id);
  }
}
