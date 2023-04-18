import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { Delivery } from './models/delivery.model';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { JwtAuthActiveGuard } from '../guards/jwt-auth-active.guard';

@ApiTags('Delivery')
@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) { }

  @ApiOperation({ summary: 'Register a new delivery' })
  @UseGuards(JwtAuthActiveGuard)
  @Post('create')
  create(@Body() createdeliveryDto: CreateDeliveryDto) {
    return this.deliveryService.createDelivery(createdeliveryDto);
  };

  @ApiOperation({ summary: 'Get all deliveries' })
  @UseGuards(JwtAuthActiveGuard)
  @Get()
  findAll() {
    return this.deliveryService.findAll();
  }

  @ApiOperation({ summary: 'Get a delivery by id' })
  @UseGuards(JwtAuthActiveGuard)
  @Get(':delivery_id')
  async getOneDelivery(@Param('delivery_id') delivery_id: string): Promise<Delivery> {
    return this.deliveryService.getOneDelivery(delivery_id);
  };

  @ApiOperation({ summary: 'Update by id' })
  @UseGuards(JwtAuthActiveGuard)
  @Put(':delivery_id')
  async updateDelivery(@Param('delivery_id') delivery_id: string, @Body() updateDeliveryDto: UpdateDeliveryDto) {
    return this.deliveryService.updateDelivery(delivery_id, updateDeliveryDto);
  };

  @ApiOperation({ summary: 'Delete by id' })
  @UseGuards(JwtAuthActiveGuard)
  @Delete(':delivery_id')
  async deleteDelivery(@Param('delivery_id') delivery_id: string) {
    return this.deliveryService.deleteDelivery(delivery_id);
  };
}
