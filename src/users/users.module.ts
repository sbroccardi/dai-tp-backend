import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schemas/user.schema';
import {
  RequestToken,
  RequestTokenSchema,
} from '../users/schemas/requestToken.schema';
import { MailModule } from '../common/mail/mail.module';
import { JwtHelperModule } from 'src/common/jwt/jwt.helper.module';
import { JwtHelperService } from 'src/common/jwt/jwt.helper.service';
import { JwtService } from '@nestjs/jwt';
import {
  Checkout,
  CheckoutSchema,
} from 'src/checkouts/schemas/checkout.schema';

@Module({
  imports: [
    MailModule,
    JwtHelperModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Checkout.name, schema: CheckoutSchema },
    ]),
    MongooseModule.forFeature([
      { name: RequestToken.name, schema: RequestTokenSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtHelperService, JwtService],
  exports: [UsersService],
})
export class UsersModule {}
