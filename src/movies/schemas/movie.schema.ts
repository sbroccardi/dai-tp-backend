import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
  @Prop({ required: true, unique: true })
  imdbId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  genre: string;

  @Prop({ required: true })
  age: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  image: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
