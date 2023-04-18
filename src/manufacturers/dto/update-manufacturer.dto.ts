import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateManufacturerDto {
    @ApiProperty({ example: 'telegram: @bestcompany_bot, instagram: best_company', description: "How to contact with manufacturer" })
    @IsNotEmpty()
    @IsString()
    contact_info: string;

    @ApiProperty({ example: 'bestcompany.com', description: "Manufacturer website" })
    @IsNotEmpty()
    @IsString()
    website: string
}