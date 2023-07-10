import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie, MovieDocument } from './schemas/movie.schema';
import { Comment, CommentDocument } from './schemas/comment.schema';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<MovieDocument> {
    const createdMovie = new this.movieModel(createMovieDto);
    createdMovie.rating = 3;
    return createdMovie.save();
  }

  async findAll(): Promise<MovieDocument[]> {
    return this.movieModel.find().exec();
  }

  async findById(id: string): Promise<MovieDocument> {
    return this.movieModel.findById(id);
  }

  async update(
    id: string,
    updateMovieDto: UpdateMovieDto,
  ): Promise<MovieDocument> {
    return this.movieModel
      .findByIdAndUpdate(id, updateMovieDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<MovieDocument> {
    return this.movieModel.findByIdAndDelete(id).exec();
  }
}
