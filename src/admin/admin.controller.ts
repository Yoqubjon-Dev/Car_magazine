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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { Admin } from './models/admin.model';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { JwtAuthActiveGuard } from '../guards/jwt-auth-active.guard';
import { UserSelfGuard } from '../guards/user-self.guard';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Registration' })
  @ApiResponse({ status: 201, type: Admin })
  @Post('signup')
  async registration(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.registration(createAdminDto, res);
  }

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, type: Admin })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async login(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.login(loginAdminDto, res);
  }

  @ApiOperation({ summary: 'Logout' })
  @ApiResponse({ status: 200, type: Admin })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthActiveGuard)
  @Post('signout')
  async logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.logout(refreshToken, res);
  }

  @ApiOperation({ summary: 'Admin activate' })
  @ApiResponse({ status: 200, type: [Admin] })
  @Get('activate/:link')
  async activate(@Param('link') link: string) {
    return this.adminService.activate(link);
  }

  @ApiOperation({ summary: 'Get all admins' })
  @ApiResponse({ status: 200, type: [Admin] })
  @UseGuards(JwtAuthActiveGuard)
  @Get()
  async findAll() {
    return this.adminService.findAll();
  }

  @ApiOperation({ summary: 'Get an admin by id' })
  @ApiResponse({ status: 200, type: [Admin] })
  @UseGuards(JwtAuthActiveGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @ApiOperation({ summary: 'Update by id' })
  @ApiResponse({ status: 200, type: [Admin] })
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthActiveGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  @ApiOperation({ summary: 'Delete by id' })
  @ApiResponse({ status: 200, type: [Admin] })
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthActiveGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }
}