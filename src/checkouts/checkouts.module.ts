import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CheckoutsService } from './checkouts.service';
import { CheckoutsController } from './checkouts.controller';
import { Checkout, CheckoutSchema } from './schemas/checkout.schema';
import {
  Screening,
  ScreeningSchema,
} from 'src/movies/schemas/screening.schema';

@Module({
  controllers: [CheckoutsController],
  providers: [CheckoutsService],
  imports: [
    MongooseModule.forFeature([
      { name: Checkout.name, schema: CheckoutSchema },
    ]),
    MongooseModule.forFeature([
      { name: Screening.name, schema: ScreeningSchema },
    ]),
  ],
})
export class CheckoutsModule {}
