import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Delivery } from './models/delivery.model';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Delivery]), JwtModule.register({})],
  controllers: [DeliveryController],
  providers: [DeliveryService]
})
export class DeliveryModule {}
