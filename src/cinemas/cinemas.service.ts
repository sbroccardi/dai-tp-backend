import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { Cinema, CinemaDocument } from './schemas/cinema.schema';

@Injectable()
export class CinemasService {
  constructor(
    @InjectModel(Cinema.name) private cinemaModel: Model<CinemaDocument>,
  ) {}

  async create(createCinemaDto: CreateCinemaDto): Promise<CinemaDocument> {
    const createdCinema = new this.cinemaModel(createCinemaDto);
    return createdCinema.save();
  }

  async findAll(): Promise<CinemaDocument[]> {
    return this.cinemaModel.find().exec();
  }

  async findByUserId(userId: string): Promise<CinemaDocument[]> {
    return this.cinemaModel.find({ userId: userId }).exec();
  }

  async findById(id: string): Promise<CinemaDocument> {
    return this.cinemaModel.findById(id);
  }

  async update(
    id: string,
    updateCinemaDto: UpdateCinemaDto,
  ): Promise<CinemaDocument> {
    return this.cinemaModel
      .findByIdAndUpdate(id, updateCinemaDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<CinemaDocument> {
    return this.cinemaModel.findByIdAndDelete(id).exec();
  }
}
