import { IsNotEmpty, IsString } from 'class-validator';
import { messages } from 'src/config/messages';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
    @ApiProperty({ description: 'Name of the category', example: 'Pizza'  })
    @IsString({ message: messages.CATEGORY.NAME_REQUIRED })
    @IsNotEmpty({ message: messages.CATEGORY.NAME_REQUIRED })
    name: string;
}
