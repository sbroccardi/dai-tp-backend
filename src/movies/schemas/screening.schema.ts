import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ScreeningDocument = Screening & Document;

@Schema()
export class Screening {
  @Prop({ required: true })
  movieId: string;

  @Prop({ required: true })
  auditoriumId: string;

  @Prop({ required: true })
  cinemaId: string;

  @Prop({ required: true })
  datetime: string;

  @Prop({ required: true })
  seats: [{ index: string; isReserved: boolean; checkoutId?: string }];
}

export const ScreeningSchema = SchemaFactory.createForClass(Screening);
