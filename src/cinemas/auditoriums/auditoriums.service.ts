import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAuditoriumDto } from './dto/create-auditorium.dto';
import { UpdateAuditoriumDto } from './dto/update-auditorium.dto';
import { Auditorium, AuditoriumDocument } from '../schemas/auditorium.schema';

@Injectable()
export class AuditoriumsService {
  constructor(
    @InjectModel(Auditorium.name)
    private auditoriumModel: Model<AuditoriumDocument>,
  ) {}

  async create(
    createAuditoriumDto: CreateAuditoriumDto,
  ): Promise<AuditoriumDocument> {
    const createdAuditorium = new this.auditoriumModel(createAuditoriumDto);
    return createdAuditorium.save();
  }

  async findByCinemaId(cinemaId: string): Promise<AuditoriumDocument[]> {
    return this.auditoriumModel.find({ cinemaId: cinemaId }).exec();
  }

  async findAll(): Promise<AuditoriumDocument[]> {
    return this.auditoriumModel.find().exec();
  }

  async findById(id: string): Promise<AuditoriumDocument> {
    return this.auditoriumModel.findById(id);
  }

  async update(
    id: string,
    updateAuditoriumDto: UpdateAuditoriumDto,
  ): Promise<AuditoriumDocument> {
    return this.auditoriumModel
      .findByIdAndUpdate(id, updateAuditoriumDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<AuditoriumDocument> {
    return this.auditoriumModel.findByIdAndDelete(id).exec();
  }
}
