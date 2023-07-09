import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Req,
  UseGuards,
  Logger,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { CinemasService } from './cinemas.service';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { AuditoriumsService } from './auditoriums/auditoriums.service';

@ApiBearerAuth()
@ApiTags('cinemas')
@Controller('cinemas')
export class CinemasController {
  constructor(
    private readonly cinemasService: CinemasService,
    private readonly auditoriumsService: AuditoriumsService,
  ) {}

  private readonly logger = new Logger(CinemasController.name);

  @Post()
  @ApiOperation({ summary: 'Create cinema' })
  @ApiResponse({ status: 201, description: 'Cinema created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 409, description: 'Cinema already exists.' })
  @UseGuards(AccessTokenGuard)
  create(@Body() createCinemaDto: CreateCinemaDto) {
    return this.cinemasService.create(createCinemaDto);
  }

  @Get()
  @ApiOperation({ summary: 'List user cinemas' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @UseGuards(AccessTokenGuard)
  findAll(@Req() req: Request) {
    const userId = req.user['sub'];
    return this.cinemasService.findByUserId(userId);
  }

  @Get('/auditoriums/:auditoriumId')
  @ApiOperation({ summary: 'Get auditorium details' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Auditorium not found.' })
  @UseGuards(AccessTokenGuard)
  findOneAuditorium(@Param('auditoriumId') auditoriumId: string) {
    return this.auditoriumsService.findById(auditoriumId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get cinema details' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource not found.' })
  @UseGuards(AccessTokenGuard)
  findOne(@Param('id') id: string) {
    return this.cinemasService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update cinema' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Cinema not found.' })
  @UseGuards(AccessTokenGuard)
  update(@Param('id') id: string, @Body() updateCinemaDto: UpdateCinemaDto) {
    return this.cinemasService.update(id, updateCinemaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete cinema' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Cinema not found.' })
  @UseGuards(AccessTokenGuard)
  remove(@Param('id') id: string) {
    return this.cinemasService.remove(id);
  }
}
