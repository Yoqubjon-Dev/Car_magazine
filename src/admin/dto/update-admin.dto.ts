import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class UpdateAdminDto {
  @ApiProperty({ example: 'John Doe', description: "Admin's fullname" })
  @IsNotEmpty()
  @IsString()
  fullname?: string;

  @ApiProperty({ example: 'john77', description: "Admin's username" })
  @IsNotEmpty()
  @IsString()
  username?: string;
}
