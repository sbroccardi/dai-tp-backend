import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CinemasService } from './cinemas.service';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';

//@ApiBearerAuth()
@ApiTags('cinemas')
@Controller('cinemas')
export class CinemasController {
  constructor(private readonly cinemasService: CinemasService) {}

  @Post()
  @ApiOperation({ summary: 'Create cinema' })
  @ApiResponse({ status: 201, description: 'Cinema created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 409, description: 'Cinema already exists.' })
  create(@Body() createCinemaDto: CreateCinemaDto) {
    return this.cinemasService.create(createCinemaDto);
  }

  @Get()
  @ApiOperation({ summary: 'List user cinemas' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  findAll() {
    return this.cinemasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get cinema details' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Resource not found.' })
  findOne(@Param('id') id: string) {
    return this.cinemasService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update cinema' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Cinema not found.' })
  update(@Param('id') id: string, @Body() updateCinemaDto: UpdateCinemaDto) {
    return this.cinemasService.update(+id, updateCinemaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete cinema' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Cinema not found.' })
  remove(@Param('id') id: string) {
    return this.cinemasService.remove(+id);
  }
}
