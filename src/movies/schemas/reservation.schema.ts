import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
  @Prop({ required: true })
  screeningId: string;

  @Prop({ required: true })
  seats: [{ index: string; isReserved: boolean; checkoutId?: string }];
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
