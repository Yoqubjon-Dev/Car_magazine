import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, MinLength } from "class-validator";


export class CreateProductDto {
    @ApiProperty({ example: 'Steering wheel', description: "Product name" })
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @ApiProperty({ example: 'd20259b9-7e2b-42c2-91ef-e8a638d7fa21', description: "Product category id" })
    @IsNotEmpty()
    @IsString()
    category_id: string;

    @ApiProperty({
      example: 'Black wheel for racing',
      description: "Product description",
    })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({ example: 50, description: "Product quantity" })
    @IsNotEmpty()
    @IsNumber()
    quantity: number;
  
    @ApiProperty({ example: 300, description: "Product price" })
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ApiProperty({ example: 'd20259b9-7e2b-42c2-91ef-e8a638d7fa21', description: "Product manufacturer's id" })
    @IsNotEmpty()
    @IsString()
    manufacturer_id: string;
  }