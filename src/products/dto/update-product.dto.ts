import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateProductDto {
        @ApiProperty({ example: 60, description: "Product quantity" })
        @IsNotEmpty()
        @IsNumber()
        quantity: number;
      
        @ApiProperty({ example: 350, description: "Product price" })
        @IsNotEmpty()
        @IsNumber()
        price: number;
}