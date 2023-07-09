import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { Checkout, CheckoutDocument } from './schemas/checkout.schema';
import {
  Screening,
  ScreeningDocument,
} from 'src/movies/schemas/screening.schema';

@Injectable()
export class CheckoutsService {
  constructor(
    @InjectModel(Checkout.name) private checkoutModel: Model<CheckoutDocument>,
    @InjectModel(Screening.name)
    private screeningModel: Model<ScreeningDocument>,
  ) {}

  async create(
    createCheckoutDto: CreateCheckoutDto,
  ): Promise<CheckoutDocument> {
    const createdCheckout = new this.checkoutModel(createCheckoutDto);
    if (createCheckoutDto.seats.endsWith(',')) {
      createCheckoutDto.seats = createCheckoutDto.seats.slice(0, -1);
    }
    const checkout = await createdCheckout.save();

    const screening = await this.screeningModel
      .findById(createCheckoutDto.screeningId)
      .exec();

    if (!screening) return null;

    const requestedSeats = checkout.seats.split(',');

    const availableSeats = screening.seats.filter((seat) => !seat.isReserved);

    const isCompletelyAvailable = requestedSeats.every((seatIndex) => {
      return availableSeats.some(
        (availableSeat) => availableSeat.index === seatIndex,
      );
    });

    if (!isCompletelyAvailable) {
      await this.checkoutModel.findByIdAndRemove(checkout._id);
      return null;
    }

    for (const seat of screening.seats) {
      if (requestedSeats.includes(seat.index)) {
        seat.isReserved = true;
        seat.checkoutId = checkout._id;
      }
    }

    screening.markModified('seats');

    await screening.save();

    return checkout;
  }

  async findById(id: string): Promise<CheckoutDocument> {
    return this.checkoutModel.findById(id);
  }
}
