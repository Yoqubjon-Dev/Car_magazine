import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, MinLength } from "class-validator";


export class UpdateUserAdressDto {
    @ApiProperty({ example: 'Uzbekistan', description: "Your country" })
    @IsNotEmpty()
    @IsString()
    country: string;

    @ApiProperty({ example: 'Tashkent',description: "Your city", })
    @IsNotEmpty()
    @IsString()
    city: string;

    @ApiProperty({ example: "Yunusabad", description: "Your region" })
    @IsNotEmpty()
    @IsString()
    region: string;

    @ApiProperty({ example: "Yoshlik", description: "Your street" })
    @IsNotEmpty()
    @IsString()
    street: string;

    @ApiProperty({ example: '10', description: "Your home_number" })
    @IsNotEmpty()
    @IsString()
    home_number: string;
}