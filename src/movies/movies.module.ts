import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { ScreeningsModule } from './screenings/screenings.module';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
  imports: [ScreeningsModule]
})
export class MoviesModule {}
