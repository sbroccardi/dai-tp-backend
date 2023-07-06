import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateScreeningDto } from './dto/create-screening.dto';
import { UpdateScreeningDto } from './dto/update-screening.dto';
import { Screening, ScreeningDocument } from '../schemas/screening.schema';
import {
  Reservation,
  ReservationDocument,
} from '../schemas/reservation.schema';
import {
  Auditorium,
  AuditoriumDocument,
} from 'src/cinemas/schemas/auditorium.schema';

@Injectable()
export class ScreeningsService {
  constructor(
    @InjectModel(Screening.name)
    private screeningModel: Model<ScreeningDocument>,
    @InjectModel(Auditorium.name)
    private auditoriumModel: Model<AuditoriumDocument>,
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
  ) {}

  async create(
    createScreeningDto: CreateScreeningDto,
  ): Promise<ScreeningDocument> {
    const createdScreening = new this.screeningModel(createScreeningDto);
    const screening = await createdScreening.save();

    const reservation = new this.reservationModel();
    reservation.screeningId = screening._id;

    const auditorium = await this.auditoriumModel
      .findById(createScreeningDto.auditoriumId)
      .exec();

    if (!auditorium) return null;

    const qty = auditorium.seatsPerRow * auditorium.rows;
    for (let index = 1; index <= qty; index++) {
      reservation.seats.push({
        index: `${index}`,
        isReserved: false,
      });
    }

    await reservation.save();

    return screening;
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
