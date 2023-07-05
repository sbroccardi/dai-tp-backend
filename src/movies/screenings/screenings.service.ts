import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateScreeningDto } from './dto/create-screening.dto';
import { UpdateScreeningDto } from './dto/update-screening.dto';
import { Screening, ScreeningDocument } from '../schemas/screening.schema';

@Injectable()
export class ScreeningsService {
  constructor(
    @InjectModel(Screening.name)
    private screeningModel: Model<ScreeningDocument>,
  ) {}

  async create(
    createScreeningDto: CreateScreeningDto,
  ): Promise<ScreeningDocument> {
    const createdScreening = new this.screeningModel(createScreeningDto);
    return createdScreening.save();
  }

  async findByMovieId(movieId: string): Promise<ScreeningDocument[]> {
    return this.screeningModel.find({ movieId: movieId }).exec();
  }

  async findAll(): Promise<ScreeningDocument[]> {
    return this.screeningModel.find().exec();
  }

  async findById(id: string): Promise<ScreeningDocument> {
    return this.screeningModel.findById(id);
  }

  async update(
    id: string,
    updateScreeningDto: UpdateScreeningDto,
  ): Promise<ScreeningDocument> {
    return this.screeningModel
      .findByIdAndUpdate(id, updateScreeningDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<ScreeningDocument> {
    return this.screeningModel.findByIdAndDelete(id).exec();
  }
}
