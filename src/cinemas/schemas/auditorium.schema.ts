import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuditoriumDocument = Auditorium & Document;

@Schema()
export class Auditorium {
  @Prop({ required: true })
  cinemaId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  rows: number;

  @Prop({ required: true })
  seatsPerRow: number;

  @Prop()
  available: boolean;
}

export const AuditoriumSchema = SchemaFactory.createForClass(Auditorium);
