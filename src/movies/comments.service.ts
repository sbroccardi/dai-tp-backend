import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { Movie, MovieDocument } from './schemas/movie.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<CommentDocument> {
    const createdComment = new this.commentModel(createCommentDto);
    const qtyComments = await this.commentModel
      .count({ movieId: createdComment.movieId })
      .exec();
    const movie = await this.movieModel.findById(createCommentDto.movieId);
    let nuevoPromedio =
      (movie.rating * qtyComments + createCommentDto.rate) / (qtyComments + 1);
    nuevoPromedio = Math.min(Math.max(Math.round(nuevoPromedio), 1), 5);
    movie.rating = nuevoPromedio;
    await movie.save();
    return await createdComment.save();
  }

  async findAll(): Promise<CommentDocument[]> {
    return this.commentModel.find().exec();
  }

  async findAllByMovieId(movieId: string): Promise<CommentDocument[]> {
    return this.commentModel.find({ movieId: movieId }).exec();
  }

  async findById(id: string): Promise<CommentDocument> {
    return this.commentModel.findById(id);
  }

  async update(
    id: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<CommentDocument> {
    return this.commentModel
      .findByIdAndUpdate(id, updateCommentDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<CommentDocument> {
    return this.commentModel.findByIdAndDelete(id).exec();
  }
}
