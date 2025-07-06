import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateDishDto } from './create-dish.dto';

export class UpdateDishDto extends PartialType(CreateDishDto) {}
