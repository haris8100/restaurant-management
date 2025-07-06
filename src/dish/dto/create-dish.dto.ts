import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateDishDto {
    
    @ApiProperty({ description: 'Name of dish', example: 'Pizza' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'Price of dish', example: '10' })
    @Type(() => Number)
    @IsNumber()
    price: number;

    @ApiProperty({ description: 'Description of dish', example: 'Pizza is a good food' })
    @IsString()
    description: string;
}
