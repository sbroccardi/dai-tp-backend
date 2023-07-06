import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CheckoutsService } from './checkouts.service';
import { CheckoutsController } from './checkouts.controller';
import { Checkout, CheckoutSchema } from './schemas/checkout.schema';
import {
  Reservation,
  ReservationSchema,
} from 'src/movies/schemas/reservation.schema';

@Module({
  controllers: [CheckoutsController],
  providers: [CheckoutsService],
  imports: [
    MongooseModule.forFeature([
      { name: Checkout.name, schema: CheckoutSchema },
    ]),
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
    ]),
  ],
})
export class CheckoutsModule {}
