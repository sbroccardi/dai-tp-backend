import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { Checkout, CheckoutDocument } from './schemas/checkout.schema';
import {
  Reservation,
  ReservationDocument,
} from 'src/movies/schemas/reservation.schema';

@Injectable()
export class CheckoutsService {
  constructor(
    @InjectModel(Checkout.name) private checkoutModel: Model<CheckoutDocument>,
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
  ) {}

  async create(
    createCheckoutDto: CreateCheckoutDto,
  ): Promise<CheckoutDocument> {
    const createdCheckout = new this.checkoutModel(createCheckoutDto);
    const checkout = await createdCheckout.save();

    const reservation = await this.reservationModel
      .findOne({ screeningId: createCheckoutDto.screeningId })
      .exec();

    if (!reservation) return null;

    const requestedSeats = createCheckoutDto.seats.split(',');
    const availableSeats = reservation.seats.filter((seat) => !seat.isReserved);

    const isCompletelyAvailable = requestedSeats.every((seatIndex) => {
      return availableSeats.some(
        (availableSeat) => availableSeat.index === seatIndex,
      );
    });

    if (!isCompletelyAvailable) {
      this.checkoutModel.findByIdAndRemove(checkout._id);
      return null;
    }

    for (const seat of reservation.seats) {
      if (requestedSeats.includes(seat.index)) {
        seat.isReserved = true;
        seat.checkoutId = checkout._id;
      }
    }

    await reservation.save();

    return checkout;
  }

  async findById(id: string): Promise<CheckoutDocument> {
    return this.checkoutModel.findById(id);
  }
}
