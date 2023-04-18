import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { v4 as uuidv4} from "uuid"
import { Order } from './models/order.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { or } from 'sequelize';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order) private orderRepo: typeof Order){}
    async createOrder(createOrderDto: CreateOrderDto): Promise<Order>{
        
        const order = await this.orderRepo.create(
          {order_id: uuidv4(), ... createOrderDto});
        return order;
    };

    async findAll(){
      const allOrders = await this.orderRepo.findAll({include: {all: true}});
      return allOrders;
    }
  
    async getOneOrder(order_id: string): Promise<Order>{
      const order = await this.orderRepo.findOne({where: {order_id}});
      return order;
    };

  async updateOrder(order_id: string, updateOrderDto: UpdateOrderDto){
    const order = await this.orderRepo.update(updateOrderDto, {
        where: {order_id},
        returning: true
    });
    return order;
  };

  async deleteOrder(order_id: string){
    return this.orderRepo.destroy({where: {order_id}});
  };
}
