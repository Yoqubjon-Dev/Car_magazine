import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, MinLength } from "class-validator";


export class UpdateOrderDto {

    @ApiProperty({ example: 'd20259b9-7e2b-42c2-91ef-e8a638d7fa21', description: "Product id" })
    @IsNotEmpty()
    @IsString()
    product_id: string;

    @ApiProperty({ example: 50, description: "Product quantity" })
    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}