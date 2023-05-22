import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CinemaDocument = Cinema & Document;

@Schema()
export class Cinema {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  location: string;
}

export const CinemaSchema = SchemaFactory.createForClass(Cinema);
