import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4, v4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { MailService } from '../mail/mail.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async registration(createUserDto: CreateUserDto, res: Response) {
    const email = await this.getUserByEmail(createUserDto.email);
    const username = await this.getUserByUsername(createUserDto.username);
    if (email) {
      throw new BadRequestException('Email already registered!');
    }
    if (username) {
      throw new BadRequestException('Username already exists!');
    }
    const password = await bcrypt.hash(createUserDto.password, 7);
    const newUser = await this.userRepository.create({
      user_id: uuidv4(),
      ...createUserDto,
      password,
    });
    const tokens = await this.getTokens(newUser);
    const refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const uniqueKey: string = uuidv4();
    const updatedUser = await this.userRepository.update(
      {
        refresh_token,
        activation_link: uniqueKey,
      },
      {
        where: { user_id: newUser.user_id },
        returning: true,
      },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    await this.mailService.sendUserConfirmation(updatedUser[1][0]);
    const response = {
      message: 'User registered',
      user: updatedUser[1][0],
      tokens,
    };
    return response;
  }

  async login(loginUserDto: LoginUserDto, res: Response) {
    const { email, password } = loginUserDto;
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not registered');
    }
    const isMatchPass = await bcrypt.compare(password, user.password);
    if (!isMatchPass) {
      throw new UnauthorizedException('User not registered(pass)');
    }
    if (!user.is_active) {
      throw new UnauthorizedException('User not activated');
    }
    const tokens = await this.getTokens(user);
    const refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updatedUser = await this.userRepository.update(
      {
        refresh_token,
      },
      {
        where: { user_id: user.user_id },
        returning: true,
      },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: 'User logged in',
      user: updatedUser[1][0],
      tokens,
    };
    return response;
  }

  async logout(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!userData) {
      throw new ForbiddenException('User not found');
    }
    const updateUser = await this.userRepository.update(
      { refresh_token: null },
      { where: { user_id: userData.user_id }, returning: true },
    );
    res.clearCookie('refresh_token');
    const response = {
      message: 'User logged out successfully',
      user: updateUser[1][0],
    };
    return response;
  }

  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link is expired');
    }
    const updatedUser = await this.userRepository.update(
      { is_active: true },
      { where: { activation_link: link, is_active: false }, returning: true },
    );
    if (!updatedUser[1][0]) {
      throw new BadRequestException('User already activated');
    }
    const response = {
      message: 'User activated successfully',
      user: updatedUser[1][0],
    };
    return response;
  }

  async getTokens(user: User) {
    const jwtPayload = {
      user_id: user.user_id,
      is_active: user.is_active,
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

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    return user;
  }

  async getUserByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
    });
    return user;
  }

  async findAll() {
    return this.userRepository.findAll();
  }

  async findOne(user_id: string) {
    return this.userRepository.findOne({ where: { user_id } });
  }

  async update(user_id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userRepository.update(updateUserDto, {
      where: { user_id },
      returning: true,
    });
    if (!updatedUser[1][0]) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return updatedUser[1][0];
  }

  async remove(user_id: string) {
    const deletedUser = await this.userRepository.destroy({ where: { user_id } });
    if (!deletedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return {message: "User deleted"};
  }
}
