import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { STATUS } from 'src/constants';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { messages } from 'src/config/messages';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const exist = await this.categoryRepository.findOne({
        where: {
          name: createCategoryDto.name,
          status: STATUS.ACTIVE
        },
      });

      if (exist) return { status: HttpStatus.BAD_REQUEST, errorMessage: messages.CATEGORY.EXISTS };
      const add = await this.categoryRepository.save(this.categoryRepository.create(createCategoryDto));

      return {
        status: HttpStatus.OK,
        data: { id: add.id },
        message: messages.CATEGORY.CREATED
      };

    } catch (e) {
      console.error('Error creating category:', e);
      return { status: HttpStatus.INTERNAL_SERVER_ERROR, errorMessage: messages.COMMON.INTERNAL_SERVER_ERROR };
    }
  }

}
