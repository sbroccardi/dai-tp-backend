import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { ScreeningsModule } from './screenings/screenings.module';
import { Movie, MovieSchema } from './schemas/movie.schema';
import { Comment, CommentSchema } from './schemas/comment.schema';
import { CommentsService } from './comments.service';
import { ScreeningsService } from './screenings/screenings.service';
import { Screening, ScreeningSchema } from './schemas/screening.schema';
import {
  Auditorium,
  AuditoriumSchema,
} from 'src/cinemas/schemas/auditorium.schema';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService, CommentsService, ScreeningsService],
  imports: [
    MongooseModule.forFeature([
      { name: Movie.name, schema: MovieSchema },
      { name: Comment.name, schema: CommentSchema },
      { name: Screening.name, schema: ScreeningSchema },
      { name: Auditorium.name, schema: AuditoriumSchema },
    ]),
    ScreeningsModule,
  ],
})
export class MoviesModule {}
