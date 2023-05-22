import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScreeningsService } from './screenings.service';
import { ScreeningsController } from './screenings.controller';
import { Screening, ScreeningSchema } from '../schemas/screening.schema';

@Module({
  controllers: [ScreeningsController],
  providers: [ScreeningsService],
  imports: [
    MongooseModule.forFeature([
      { name: Screening.name, schema: ScreeningSchema },
    ]),
  ],
})
export class ScreeningsModule {}
