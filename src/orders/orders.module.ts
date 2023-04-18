import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './models/order.model';
import { OrderController } from './orders.controller';
import { OrderService } from './orders.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Order]), JwtModule.register({})],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
