import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { v4 as uuidv4} from "uuid"
import { Delivery } from './models/delivery.model';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Injectable()
export class DeliveryService {
  constructor(@InjectModel(Delivery) private deliveryRepo: typeof Delivery){}
    async createDelivery(createDeliveryDto: CreateDeliveryDto): Promise<Delivery>{
        
        const delivery = await this.deliveryRepo.create(
          {delivery_id: uuidv4(), ... createDeliveryDto});
        return delivery;
    };

    async findAll(){
      const allDeliveries = await this.deliveryRepo.findAll({include: {all: true}});
      return allDeliveries;
    }
  
    async getOneDelivery(delivery_id: string): Promise<Delivery>{
      const delivery = await this.deliveryRepo.findOne({where: {delivery_id}});
      return delivery;
    };

  async updateDelivery(delivery_id: string, updateDeliveryDto: UpdateDeliveryDto){
    const delivery = await this.deliveryRepo.update(updateDeliveryDto, {
        where: {delivery_id},
        returning: true
    });
    return delivery;
  };

  async deleteDelivery(delivery_id: string){
    return this.deliveryRepo.destroy({where: {delivery_id}});
  };
}
