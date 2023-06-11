import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RequestTokenDocument = RequestToken & Document;

@Schema()
export class RequestToken {
  @Prop({ required: true, unique: true })
  @Prop()
  userId: string;

  @Prop({ required: true, unique: true })
  @Prop()
  created: string;

  @Prop({ required: true, unique: true })
  @Prop()
  token: string;
}

export const RequestTokenSchema = SchemaFactory.createForClass(RequestToken);
