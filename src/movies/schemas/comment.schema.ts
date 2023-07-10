import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({ required: true })
  movieId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: false })
  comment?: string;

  @Prop({ required: false })
  rate?: number;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
