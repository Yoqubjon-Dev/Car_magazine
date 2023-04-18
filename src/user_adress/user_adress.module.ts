import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserAdress } from './models/user_adress.model';
import { UserAdressController } from './user_adress.controller';
import { UserAdressService } from './user_adress.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([UserAdress]), JwtModule.register({})],
  controllers: [UserAdressController],
  providers: [UserAdressService]
})
export class UserAdressModule {}
