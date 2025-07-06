import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRestaurantDto {
  @ApiProperty({ description: 'Name of the restaurant', example: 'Pizza Palace' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Location of the restaurant', example: '123 Main St, Chennai' })
  @IsString()
  @IsNotEmpty()
  location: string;
}