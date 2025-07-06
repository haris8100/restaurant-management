import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsNumber, IsUUID } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {

    @ApiProperty({ description: 'User ID', format: 'uuid' })
    @IsUUID()
    userId: string;

    @ApiProperty({ description: 'Array of dish IDs', type: [String], format: 'uuid' })
    @IsArray()
    @ArrayNotEmpty()
    @IsUUID('all', { each: true })
    dishIds: string[];
}

export class PayOrderDto {
    @ApiProperty({ description: 'Amount to pay for the order' })
    @Type(() => Number)
    @IsNumber()
    amount: number;
}