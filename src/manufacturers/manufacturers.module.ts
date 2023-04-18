import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Manufacturer } from './models/manufacturers.model';
import { ManufacturerController } from './manufacturers.controller';
import { ManufacturerService } from './manufacturers.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Manufacturer]), JwtModule.register({})],
  controllers: [ManufacturerController],
  providers: [ManufacturerService]
})
export class ManufacturerModule {}
