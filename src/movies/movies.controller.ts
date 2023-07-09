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
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsService } from './comments.service';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ScreeningsService } from './screenings/screenings.service';

@ApiBearerAuth()
@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly commentsService: CommentsService,
    private readonly screeningsService: ScreeningsService,
  ) {}

  private readonly logger = new Logger(MoviesController.name);

  @Post()
  @ApiOperation({ summary: 'Create movie' })
  @ApiResponse({ status: 201, description: 'Movie created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 409, description: 'Movie already exists.' })
  @UseGuards(AccessTokenGuard)
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  @ApiOperation({ summary: 'List movies' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @UseGuards(AccessTokenGuard)
  findAll() {
    return this.moviesService.findAll();
  }

  @Get('/screenings/:id')
  @ApiOperation({ summary: 'Get screening details' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Screening not found.' })
  @UseGuards(AccessTokenGuard)
  findOneScreening(@Param('id') id: string) {
    return this.screeningsService.findById(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get movie details' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
  @UseGuards(AccessTokenGuard)
  findOne(@Param('id') id: string) {
    return this.moviesService.findById(id);
  }

  @Post(':id/comments')
  @ApiOperation({ summary: 'Rate & comment movie' })
  @ApiResponse({ status: 201, description: 'Comment created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
  @UseGuards(AccessTokenGuard)
  comment(@Param('id') id: string, @Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get(':id/comments')
  @ApiOperation({ summary: 'comments movie' })
  @ApiResponse({ status: 200, description: 'Comments.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
  @UseGuards(AccessTokenGuard)
  getComments(@Param('id') id: string) {
    return this.commentsService.findAllByMovieId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update movie' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
  @UseGuards(AccessTokenGuard)
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete movie' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
  @UseGuards(AccessTokenGuard)
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}
