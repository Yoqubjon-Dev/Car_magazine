import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ManufacturerService } from './manufacturers.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { Manufacturer } from './models/manufacturers.model';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthActiveGuard } from '../guards/jwt-auth-active.guard';

@ApiTags('Manufacturer')
@Controller('manufacturer')
export class ManufacturerController {
  constructor(private readonly manufacturerService: ManufacturerService) { }

  @ApiOperation({ summary: 'Register a new manufacturer' })
  @UseGuards(JwtAuthActiveGuard)
  @Post('create')
  create(@Body() createManufacturerDto: CreateManufacturerDto) {
    return this.manufacturerService.createManufacturer(createManufacturerDto);
  };

  @ApiOperation({ summary: 'Get all manufacturers' })
  @UseGuards(JwtAuthActiveGuard)
  @Get()
  findAll() {
    return this.manufacturerService.findAll();
  }

  @ApiOperation({ summary: 'Get a manufacturer by id' })
  @UseGuards(JwtAuthActiveGuard)
  @Get(':manufacturer_id')
  async getOneManufacturer(@Param('manufacturer_id') manufacturer_id: string): Promise<Manufacturer> {
    return this.manufacturerService.getOneManufacturer(manufacturer_id);
  };

  @ApiOperation({ summary: 'Update by id' })
  @UseGuards(JwtAuthActiveGuard)
  @Put(':manufacturer_id')
  async updateManufacturer(@Param('manufacturer_id') manufacturer_id: string, @Body() updateProductDto: UpdateManufacturerDto) {
    return this.manufacturerService.updateManufacturer(manufacturer_id, updateProductDto);
  };

  @ApiOperation({ summary: 'Delete by id' })
  @UseGuards(JwtAuthActiveGuard)
  @Delete(':manufacturer_id')
  async deleteManufacturer(@Param('manufacturer_id') manufacturer_id: string) {
    return this.manufacturerService.deleteManufacturer(manufacturer_id);
  };
}
