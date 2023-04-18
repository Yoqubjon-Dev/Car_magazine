import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, MinLength } from "class-validator";


export class UpdateCategoryDto {
    @ApiProperty({ example: "For tire", description: "Category name" })
    @IsNotEmpty()
    @IsString()
    name: string;
}
