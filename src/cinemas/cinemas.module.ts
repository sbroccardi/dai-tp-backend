import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CinemasService } from './cinemas.service';
import { CinemasController } from './cinemas.controller';
import { AuditoriumsModule } from './auditoriums/auditoriums.module';
import { Cinema, CinemaSchema } from './schemas/cinema.schema';
import { AuditoriumsService } from './auditoriums/auditoriums.service';
import { Auditorium, AuditoriumSchema } from './schemas/auditorium.schema';

@Module({
  controllers: [CinemasController],
  providers: [CinemasService, AuditoriumsService],
  imports: [
    MongooseModule.forFeature([
      { name: Cinema.name, schema: CinemaSchema },
      { name: Auditorium.name, schema: AuditoriumSchema },
    ]),
    AuditoriumsModule,
  ],
})
export class CinemasModule {}
