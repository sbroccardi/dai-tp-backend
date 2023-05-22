import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CinemasService } from './cinemas.service';
import { CinemasController } from './cinemas.controller';
import { AuditoriumsModule } from './auditoriums/auditoriums.module';
import { Cinema, CinemaSchema } from './schemas/cinema.schema';

@Module({
  controllers: [CinemasController],
  providers: [CinemasService],
  imports: [
    MongooseModule.forFeature([{ name: Cinema.name, schema: CinemaSchema }]),
    AuditoriumsModule,
  ],
})
export class CinemasModule {}
