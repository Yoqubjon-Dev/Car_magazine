import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ example: 'John Doe', description: "Admin's fullname" })
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @ApiProperty({ example: 'john77', description: "Admin's username" })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: 'john77@gmail.com',
    description: "Admin's email",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Uzbek1$t0n', description: "Admin's password" })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @IsStrongPassword()
  password: string;
}
