import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserAdressService } from './user_adress.service';
import { CreateUserAdressDto } from './dto/create-user_adress.dto';
import { UserAdress } from './models/user_adress.model';
import { UpdateUserAdressDto } from './dto/update-user_adress.dto';
import { JwtAuthActiveGuard } from '../guards/jwt-auth-active.guard';

@ApiTags('UserAdress')
@Controller('userAdress')
export class UserAdressController {
  constructor(private readonly userAdressService: UserAdressService) { }

  @ApiOperation({ summary: 'Register a new adress' })
  @UseGuards(JwtAuthActiveGuard)
  @Post('create')
  create(@Body() createUserAdressDto: CreateUserAdressDto) {
    return this.userAdressService.createUserAdress(createUserAdressDto);
  };

  @ApiOperation({ summary: 'Get all adresses' })
  @UseGuards(JwtAuthActiveGuard)
  @Get()
  findAll() {
    return this.userAdressService.findAll();
  }

  @ApiOperation({ summary: 'Get an adress by id' })
  @UseGuards(JwtAuthActiveGuard)
  @Get(':user_adress_id')
  async getOneUserAdress(@Param('user_adress_id') user_adress_id: string): Promise<UserAdress> {
    return this.userAdressService.getOneUserAdress(user_adress_id);
  };

  @ApiOperation({ summary: 'Update by id' })
  @UseGuards(JwtAuthActiveGuard)
  @Put(':user_adress_id')
  async updateUserAdress(@Param('user_adress_id') user_adress_id: string, @Body() updateUserAdressDto: UpdateUserAdressDto) {
    return this.userAdressService.updateUserAdress(user_adress_id, updateUserAdressDto);
  };

  @ApiOperation({ summary: 'Delete by id' })
  @UseGuards(JwtAuthActiveGuard)
  @Delete(':user_adress_id')
  async deleteUserAdress(@Param('user_adress_id') user_adress_id: string) {
    return this.userAdressService.deleteUserAdress(user_adress_id);
  };
}
