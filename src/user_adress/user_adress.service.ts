import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { v4 as uuidv4} from "uuid"
import { UserAdress } from './models/user_adress.model';
import { CreateUserAdressDto } from './dto/create-user_adress.dto';
import { UpdateUserAdressDto } from './dto/update-user_adress.dto';

@Injectable()
export class UserAdressService {
  constructor(@InjectModel(UserAdress) private userAdressRepo: typeof UserAdress){}
    async createUserAdress(createUserAdressDto: CreateUserAdressDto): Promise<UserAdress>{
        
        const userAdress = await this.userAdressRepo.create(
          {user_adress_id: uuidv4(), ... createUserAdressDto});
        return userAdress;
    };

    async findAll(){
      const allUserAdresses = await this.userAdressRepo.findAll({include: {all: true}});
      return allUserAdresses;
    }
  
    async getOneUserAdress(user_adress_id: string): Promise<UserAdress>{
      const userAdress = await this.userAdressRepo.findOne({where: {user_adress_id}});
      return userAdress;
    };

  async updateUserAdress(user_adress_id: string, updateUserAdressDto: UpdateUserAdressDto){
    const userAdress = await this.userAdressRepo.update(updateUserAdressDto, {
        where: {user_adress_id},
        returning: true
    });
    return userAdress;
  };

  async deleteUserAdress(user_adress_id: string){
    return this.userAdressRepo.destroy({where: {user_adress_id}});
  };
}
