import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Logger,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuditoriumsService } from './auditoriums.service';
import { CreateAuditoriumDto } from './dto/create-auditorium.dto';
import { UpdateAuditoriumDto } from './dto/update-auditorium.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@ApiBearerAuth()
@ApiTags('auditoriums')
@Controller('cinemas/:cinemaId/auditoriums')
export class AuditoriumsController {
  constructor(private readonly auditoriumsService: AuditoriumsService) {}

  private readonly logger = new Logger(AuditoriumsController.name);

  @Post()
  @ApiOperation({ summary: 'Create auditorium' })
  @ApiResponse({ status: 201, description: 'Auditorium created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Cinema not found.' })
  @ApiResponse({ status: 409, description: 'Auditorium already exists.' })
  @UseGuards(AccessTokenGuard)
  create(
    @Param('cinemaId') cinemaId: string,
    @Body() createAuditoriumDto: CreateAuditoriumDto,
  ) {
    return this.auditoriumsService.create(createAuditoriumDto);
  }

  @Get()
  @ApiOperation({ summary: 'List cinema auditoriums' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Cinema not found.' })
  @UseGuards(AccessTokenGuard)
  findAll(@Param('cinemaId') cinemaId: string) {
    return this.auditoriumsService.findByCinemaId(cinemaId);
  }

  @Get(':auditoriumId')
  @ApiOperation({ summary: 'Get auditorium details' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Cinema or Auditorium not found.' })
  @UseGuards(AccessTokenGuard)
  findOne(
    @Param('cinemaId') cinemaId: string,
    @Param('auditoriumId') auditoriumId: string,
  ) {
    return this.auditoriumsService.findById(auditoriumId);
  }

  @Put(':auditoriumId')
  @ApiOperation({ summary: 'Update auditorium' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Cinema or Auditorium not found.' })
  @UseGuards(AccessTokenGuard)
  update(
    @Param('cinemaId') cinemaId: string,
    @Param('auditoriumId') auditoriumId: string,
    @Body() updateAuditoriumDto: UpdateAuditoriumDto,
  ) {
    return this.auditoriumsService.update(auditoriumId, updateAuditoriumDto);
  }

  @Delete(':auditoriumId')
  @ApiOperation({ summary: 'Delete auditorium' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Cinema or Auditorium not found.' })
  @UseGuards(AccessTokenGuard)
  remove(
    @Param('cinemaId') cinemaId: string,
    @Param('auditoriumId') auditoriumId: string,
  ) {
    return this.auditoriumsService.remove(auditoriumId);
  }
}
