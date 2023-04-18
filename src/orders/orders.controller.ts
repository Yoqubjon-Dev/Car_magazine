import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrderService } from './orders.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './models/order.model';
import { JwtAuthActiveGuard } from '../guards/jwt-auth-active.guard';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @ApiOperation({ summary: 'Register a new order' })
  @UseGuards(JwtAuthActiveGuard)
  @Post('create')
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  };

  @ApiOperation({ summary: 'Get all orders' })
  @UseGuards(JwtAuthActiveGuard)
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @ApiOperation({ summary: 'get a order by id' })
  @UseGuards(JwtAuthActiveGuard)
  @Get(':order_id')
  async getOneOrder(@Param('order_id') order_id: string): Promise<Order> {
    return this.orderService.getOneOrder(order_id);
  };

  @ApiOperation({ summary: 'Update by id' })
  @UseGuards(JwtAuthActiveGuard)
  @Put(':order_id')
  async updateOrder(@Param('order_id') order_id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.updateOrder(order_id, updateOrderDto);
  };

  @ApiOperation({ summary: 'Delete by id' })
  @UseGuards(JwtAuthActiveGuard)
  @Delete(':order_id')
  async deleteOrder(@Param('order_id') order_id: string) {
    return this.orderService.deleteOrder(order_id);
  };
}
