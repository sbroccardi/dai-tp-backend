import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import {
  RequestToken,
  RequestTokenDocument,
} from './schemas/requestToken.schema';
import { MailService } from '../common/mail/mail.service';
import { JwtHelperService } from 'src/common/jwt/jwt.helper.service';
import {
  Checkout,
  CheckoutDocument,
} from 'src/checkouts/schemas/checkout.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Checkout.name) private checkoutModel: Model<CheckoutDocument>,
    @InjectModel(RequestToken.name)
    private requestTokenModel: Model<RequestTokenDocument>,
    private mailService: MailService,
    private jwtHelperService: JwtHelperService,
  ) {}

  async signUpPrivate(createUserDto: CreateUserDto): Promise<any> {
    // Check if user exists
    const userExists = await this.findByEmail(createUserDto.email);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    // Hash password
    const hash = await this.jwtHelperService.hashData(createUserDto.password);
    const newUser = await this.create({
      ...createUserDto,
      type: 'private',
      password: hash,
    });
    const tokens = await this.jwtHelperService.getTokens(
      newUser._id,
      newUser.email,
    );
    await this.updateRefreshToken(newUser._id, tokens.refreshToken);
    return tokens;
  }

  generatePIN(): string {
    let pin = '';
    for (let i = 0; i < 4; i++) {
      pin += Math.floor(Math.random() * 10);
    }
    return pin;
  }

  async resetPassword(email: string) {
    const user = await this.findByEmail(email);
    if (!user) throw new BadRequestException('User does not exist');

    const createdRequestToken = new this.requestTokenModel({
      userId: user.id,
      created: Date.now(),
      token: this.generatePIN(),
    });

    createdRequestToken.save();

    await this.mailService.sendResetPassword(
      user.fullname,
      user.email,
      createdRequestToken.token,
    );
  }

  async confirmCode(email: string, token: string) {
    const user = await this.findByEmail(email);
    if (!user) throw new BadRequestException('User does not exist');

    const requestToken = await this.requestTokenModel
      .findOne({ userId: user.id, token: token })
      .exec();

    if (!requestToken) throw new BadRequestException('Token does not exist');

    return user.id;
  }

  async changePassword(userId: string, newPassword: string, token: string) {
    const user = await this.findById(userId);
    if (!user) throw new BadRequestException('User does not exist');

    const requestToken = await this.requestTokenModel
      .findOne({ userId, token })
      .exec();

    if (!requestToken) throw new BadRequestException('Token does not exist');

    await this.requestTokenModel.findByIdAndDelete(requestToken.id).exec();

    // Hash password
    user.password = await this.jwtHelperService.hashData(newPassword);
    user.save();
  }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id);
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<UserDocument> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.jwtHelperService.hashData(
      refreshToken,
    );
    await this.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  // PURCHASES
  async findPurchasesByUserId(userId: string): Promise<CheckoutDocument[]> {
    //TODO:
    return this.checkoutModel.find({ userId: userId }).exec();
  }
}
