import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CheckoutDocument = Checkout & Document;

@Schema()
export class Checkout {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  screeningId: string;

  @Prop({ required: true })
  seats: string;

  @Prop({ required: false })
  totalPrice: number;
}

export const CheckoutSchema = SchemaFactory.createForClass(Checkout);
