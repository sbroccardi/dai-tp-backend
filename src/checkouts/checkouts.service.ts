import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { Checkout, CheckoutDocument } from './schemas/checkout.schema';

@Injectable()
export class CheckoutsService {
  constructor(
    @InjectModel(Checkout.name) private checkoutModel: Model<CheckoutDocument>,
  ) {}

  async create(
    createCheckoutDto: CreateCheckoutDto,
  ): Promise<CheckoutDocument> {
    const createdCheckout = new this.checkoutModel(createCheckoutDto);
    return createdCheckout.save();
  }

  async findById(id: string): Promise<CheckoutDocument> {
    return this.checkoutModel.findById(id);
  }
}
