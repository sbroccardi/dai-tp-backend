import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
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

//@ApiBearerAuth()
@ApiTags('auditoriums')
@Controller('cinemas/:cinemaId/auditoriums')
export class AuditoriumsController {
  constructor(private readonly auditoriumsService: AuditoriumsService) {}

  @Post()
  @ApiOperation({ summary: 'Create auditorium' })
  @ApiResponse({ status: 201, description: 'Auditorium created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Cinema not found.' })
  @ApiResponse({ status: 409, description: 'Auditorium already exists.' })
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
  findAll(@Param('cinemaId') cinemaId: string) {
    return this.auditoriumsService.findAll();
  }

  @Get(':auditoriumId')
  @ApiOperation({ summary: 'Get auditorium details' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Cinema or Auditorium not found.' })
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
  remove(
    @Param('cinemaId') cinemaId: string,
    @Param('auditoriumId') auditoriumId: string,
  ) {
    return this.auditoriumsService.remove(auditoriumId);
  }
}
