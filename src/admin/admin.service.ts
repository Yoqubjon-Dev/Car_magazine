import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4, v4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { MailService } from '../mail/mail.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { Admin } from './models/admin.model';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private adminRepository: typeof Admin,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async registration(createAdminDto: CreateAdminDto, res: Response) {
    const email = await this.getAdminByEmail(createAdminDto.email);
    const username = await this.getAdminByUsername(createAdminDto.username);
    if (email) {
      throw new BadRequestException('Email already registered!');
    }
    if (username) {
      throw new BadRequestException('Username already exists!');
    }
    const password = await bcrypt.hash(createAdminDto.password, 7);
    const newAdmin = await this.adminRepository.create({
      admin_id: uuidv4(),
      ...createAdminDto,
      password,
    });
    const tokens = await this.getTokens(newAdmin);
    const refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const uniqueKey: string = uuidv4();
    const updatedAdmin = await this.adminRepository.update(
      {
        refresh_token,
        activation_link: uniqueKey,
      },
      {
        where: { admin_id: newAdmin.admin_id },
        returning: true,
      },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    await this.mailService.sendAdminConfirmation(updatedAdmin[1][0]);
    const response = {
      message: 'Admin registered',
      admin: updatedAdmin[1][0],
      tokens,
    };
    return response;
  }

  async login(loginAdminDto: LoginAdminDto, res: Response) {
    const { email, password } = loginAdminDto;
    const admin = await this.getAdminByEmail(email);
    if (!admin) {
      throw new UnauthorizedException('Admin not registered');
    }
    const isMatchPass = await bcrypt.compare(password, admin.password);
    if (!isMatchPass) {
      throw new UnauthorizedException('Admin not registered(pass)');
    }
    if (!admin.is_active) {
      throw new UnauthorizedException('Admin not activated');
    }
    const tokens = await this.getTokens(admin);
    const refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updatedAdmin = await this.adminRepository.update(
      {
        refresh_token,
      },
      {
        where: { admin_id: admin.admin_id},
        returning: true,
      },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: 'Admin logged in',
      admin: updatedAdmin[1][0],
      tokens,
    };
    return response;
  }

  async logout(refreshToken: string, res: Response) {
    const adminData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!adminData) {
      throw new ForbiddenException('User not found');
    }
    const updateAdmin = await this.adminRepository.update(
      { refresh_token: null },
      { where: { admin_id: adminData.admin_id }, returning: true },
    );
    res.clearCookie('refresh_token');
    const response = {
      message: 'Admin logged out successfully',
      admin: updateAdmin[1][0],
    };
    return response;
  }

  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link is expired');
    }
    const updatedAdmin = await this.adminRepository.update(
      { is_active: true },
      { where: { activation_link: link, is_active: false }, returning: true },
    );
    if (!updatedAdmin[1][0]) {
      throw new BadRequestException('Admin already activated');
    }
    const response = {
      message: 'Admin activated successfully',
      admin: updatedAdmin[1][0],
    };
    return response;
  }

  async getTokens(admin: Admin) {
    const jwtPayload = {
      admin_id: admin.admin_id,
      is_active: admin.is_active,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async getAdminByEmail(email: string) {
    const admin = await this.adminRepository.findOne({
      where: { email },
    });
    return admin;
  }

  async getAdminByUsername(username: string) {
    const admin = await this.adminRepository.findOne({
      where: { username },
    });
    return admin;
  }

  async findAll() {
    return this.adminRepository.findAll();
  }

  async findOne(admin_id: string) {
    return this.adminRepository.findOne({ where: { admin_id } });
  }

  async update(admin_id: string, updateAdminDto: UpdateAdminDto) {
    const updatedAdmin = await this.adminRepository.update(updateAdminDto, {
      where: { admin_id },
      returning: true,
    });
    if (!updatedAdmin[1][0]) {
      throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);
    }
    return updatedAdmin[1][0];
  }

  async remove(admin_id: string) {
    const deletedAdmin = await this.adminRepository.destroy({ where: { admin_id } });
    if (!deletedAdmin) {
      throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);
    }
    return {message: "Admin deleted"};
  }
}
