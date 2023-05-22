import { Module } from '@nestjs/common';
import { CinemasService } from './cinemas.service';
import { CinemasController } from './cinemas.controller';
import { AuditoriumsModule } from './auditoriums/auditoriums.module';

@Module({
  controllers: [CinemasController],
  providers: [CinemasService],
  imports: [AuditoriumsModule]
})
export class CinemasModule {}
