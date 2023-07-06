import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScreeningsService } from './screenings.service';
import { ScreeningsController } from './screenings.controller';
import { Screening, ScreeningSchema } from '../schemas/screening.schema';
import {
  Auditorium,
  AuditoriumSchema,
} from 'src/cinemas/schemas/auditorium.schema';
import { Reservation, ReservationSchema } from '../schemas/reservation.schema';

@Module({
  controllers: [ScreeningsController],
  providers: [ScreeningsService],
  imports: [
    MongooseModule.forFeature([
      { name: Screening.name, schema: ScreeningSchema },
    ]),
    MongooseModule.forFeature([
      { name: Auditorium.name, schema: AuditoriumSchema },
    ]),
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
    ]),
  ],
})
export class ScreeningsModule {}
