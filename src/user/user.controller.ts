import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './models/user.model';
import { Response } from 'express';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthActiveGuard } from '../guards/jwt-auth-active.guard';
import { UserSelfGuard } from '../guards/user-self.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Registration' })
  @ApiResponse({ status: 201, type: User })
  @Post('signup')
  async registration(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.registration(createUserDto, res);
  }

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, type: User })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.login(loginUserDto, res);
  }

  @ApiOperation({ summary: 'Logout' })
  @ApiResponse({ status: 200, type: User })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthActiveGuard)
  @Post('signout')
  async logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.logout(refreshToken, res);
  }

  @ApiOperation({ summary: 'User activate' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('activate/:link')
  async activate(@Param('link') link: string) {
    return this.userService.activate(link);
  }

  @ApiOperation({ summary: 'Get all users' })
  @UseGuards(JwtAuthActiveGuard)
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Get a user by id' })
  @UseGuards(JwtAuthActiveGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: 'Update by id' })
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthActiveGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete by id' })
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthActiveGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
