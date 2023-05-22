import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuditoriumsService } from './auditoriums.service';
import { AuditoriumsController } from './auditoriums.controller';
import { Auditorium, AuditoriumSchema } from '../schemas/auditorium.schema';

@Module({
  controllers: [AuditoriumsController],
  providers: [AuditoriumsService],
  imports: [
    MongooseModule.forFeature([
      { name: Auditorium.name, schema: AuditoriumSchema },
    ]),
  ],
})
export class AuditoriumsModule {}
