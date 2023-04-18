import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { v4 as uuidv4 } from "uuid"
import { Manufacturer } from './models/manufacturers.model';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';

@Injectable()
export class ManufacturerService {
  constructor(@InjectModel(Manufacturer) private manuRepo: typeof Manufacturer) { }
  async createManufacturer(createManufacturerDto: CreateManufacturerDto): Promise<Manufacturer> {

    const manufacturer = await this.manuRepo.create(
      { manufacturer_id: uuidv4(), ...createManufacturerDto });
    return manufacturer;
  };

  async findAll() {
    const allManufacturers = await this.manuRepo.findAll({ include: { all: true } });
    return allManufacturers;
  }

  async getOneManufacturer(manufacturer_id: string): Promise<Manufacturer> {
    const manufacturer = await this.manuRepo.findOne({ where: { manufacturer_id } });
    return manufacturer;
  };

  async updateManufacturer(manufacturer_id: string, updateManufacturerDto: UpdateManufacturerDto) {
    const manufacturer = await this.manuRepo.update(updateManufacturerDto, {
      where: { manufacturer_id },
      returning: true
    });
    return manufacturer_id;
  };

  async deleteManufacturer(manufacturer_id: string) {
    return this.manuRepo.destroy({ where: { manufacturer_id } });
  };
}
