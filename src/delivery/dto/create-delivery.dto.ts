import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, MinLength } from "class-validator";


export class CreateDeliveryDto {
    @ApiProperty({ example: 'd20259b9-7e2b-42c2-91ef-e8a638d7fa21', description: "Order id" })
    @IsNotEmpty()
    @IsString()
    order_id: string;

    @ApiProperty({ example: true, description: "If you want fast-shipping?" })
    @IsNotEmpty()
    @IsBoolean()
    fast_shipping: boolean;

    @ApiProperty({ example: 'Payment via card', description: "Select a payment type", })
    @IsNotEmpty()
    @IsString()
    payment_type: string;

    @ApiProperty({ example: 'd20259b9-7e2b-42c2-91ef-e8a638d7fa21', description: "User id" })
    @IsNotEmpty()
    @IsString()
    user_id: string;
  }