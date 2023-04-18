import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, MinLength } from "class-validator";


export class UpdateDeliveryDto {
    @ApiProperty({ example: true, description: "If you want fast-shipping?" })
    @IsNotEmpty()
    @IsBoolean()
    fast_shipping: boolean;

    @ApiProperty({ example: 'Payment via card', description: "Select a payment type", })
    @IsNotEmpty()
    @IsString()
    payment_type: string;
  }