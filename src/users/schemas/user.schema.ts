import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  type: string;

  @Prop()
  avatar: string;

  @Prop()
  fullname: string;

  @Prop()
  company: string;

  @Prop()
  address: string;

  @Prop()
  lat: number;

  @Prop()
  lng: number;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
