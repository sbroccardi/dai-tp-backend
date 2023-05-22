import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { ScreeningsModule } from './screenings/screenings.module';
import { Movie, MovieSchema } from './schemas/movie.schema';
import { Comment, CommentSchema } from './schemas/comment.schema';
import { CommentsService } from './comments.service';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService, CommentsService],
  imports: [
    MongooseModule.forFeature([
      { name: Movie.name, schema: MovieSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
    ScreeningsModule,
  ],
})
export class MoviesModule {}
