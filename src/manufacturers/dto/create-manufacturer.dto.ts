import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, MinLength } from "class-validator";


export class CreateManufacturerDto {
    @ApiProperty({ example: 'Best manufacturer company', description: "Manufacturer name" })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: 'telegram: @bestcompany_bot, instagram: best_company', description: "How to contact with manufacturer" })
    @IsNotEmpty()
    @IsString()
    contact_info: string;

    @ApiProperty({ example: 'bestcompany.com', description: "Manufacturer website" })
    @IsNotEmpty()
    @IsString()
    website: string;
  }
