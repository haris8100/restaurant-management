import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { ILike, Repository } from 'typeorm';
import { Multer } from 'multer';
import { RestaurantEntity } from './entities/restaurant.entity';
import { CloudinaryService } from 'src/utils';
import { messages } from 'src/config/messages';
import { STATUS } from 'src/constants';
import { DishEntity } from 'src/dish/entities/dish.entity';
import { CreateDishDto } from 'src/dish/dto/create-dish.dto';

@Injectable()
export class RestaurantService {

  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(RestaurantEntity)
    private readonly restaurantRepository: Repository<RestaurantEntity>,
    @InjectRepository(DishEntity)
    private readonly dishRepository: Repository<DishEntity>,
    private readonly cloudinaryService: CloudinaryService,
  ) { }

  async create(createRestaurantDto: CreateRestaurantDto, coverImage?: Multer.File) {
    try {
      const exist = await this.restaurantRepository.findOne({
        where: {
          name: createRestaurantDto.name,
          status: STATUS.ACTIVE
        },
      });

      if (exist) return { status: HttpStatus.BAD_REQUEST, errorMessage: messages.RESTAURANT.EXISTS };

      let coverImageUrl: string | undefined = undefined;
      if (coverImage) {
        coverImageUrl = await this.cloudinaryService.uploadFile(coverImage);
      }
      const restaurant = this.restaurantRepository.create({
        ...createRestaurantDto,
        coverImage: coverImageUrl,
      });
      const result = await this.restaurantRepository.save(restaurant);
      return { status: HttpStatus.OK, message: messages.COMMON.SUCCESS, data: { id: result.id } };

    } catch (e) {
      console.error('Error :', e);
      return { status: HttpStatus.INTERNAL_SERVER_ERROR, errorMessage: messages.COMMON.INTERNAL_SERVER_ERROR };
    }
  }

  async findAllWithCategories(query: {
    page?: number;
    limit?: number;
    name?: string;
  }) {
    const page = query.page && query.page > 0 ? query.page : 1;
    const limit = query.limit && query.limit > 0 ? query.limit : 10;
    const skip = (page - 1) * limit;

    const [restaurants, total] = await this.restaurantRepository.findAndCount({
      where: {
        status: STATUS.ACTIVE,
        ...(query.name && { name: ILike(`%${query.name}%`) }),
      },
      relations: ['categories'],
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });

    return {
      status: HttpStatus.OK,
      message: messages.RESTAURANT.LIST,
      data: {
        items: restaurants,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
    };
  }


  async linkCategory(restaurantId: string, categoryId: string) {
    try {
      const restaurant = await this.restaurantRepository.findOne({
        where: { id: restaurantId, status: STATUS.ACTIVE },
        relations: ['categories'],
      });

      if (!restaurant) {
        return { status: HttpStatus.BAD_REQUEST, errorMessage: messages.RESTAURANT.NOT_FOUND }
      }

      const category = await this.categoryRepository.findOneBy({ id: categoryId });

      if (!category) {
        return { status: HttpStatus.BAD_REQUEST, errorMessage: messages.CATEGORY.NOT_FOUND }
      }

      const alreadyLinked = restaurant.categories.some(cat => cat.id === category.id);
      if (!alreadyLinked) {
        restaurant.categories.push(category);
        await this.restaurantRepository.save(restaurant);
      }

      return { status: HttpStatus.OK, message: messages.RESTAURANT.CATEGORY_LINKED, data: {} };
    } catch (e) {
      console.error('Error :', e);
      return { status: HttpStatus.INTERNAL_SERVER_ERROR, errorMessage: messages.COMMON.INTERNAL_SERVER_ERROR };
    }
  }

  async linkDishToRestaurant(restaurantId: string, createDishDto: CreateDishDto, coverImage?: Multer.File) {
    try {
      const restaurant = await this.restaurantRepository.findOne({
        where: { id: restaurantId, status: STATUS.ACTIVE },
      });

      if (!restaurant) {
        return { status: HttpStatus.BAD_REQUEST, errorMessage: messages.RESTAURANT.NOT_FOUND }
      }

      const exist = await this.dishRepository
        .createQueryBuilder('dish')
        .leftJoin('dish.restaurant', 'restaurant')
        .where('dish.name = :name', { name: createDishDto.name })
        .andWhere('restaurant.id = :restaurantId', { restaurantId })
        .andWhere('dish.status = :status', { status: STATUS.ACTIVE })
        .getOne();
      if (exist) return { status: HttpStatus.BAD_REQUEST, errorMessage: messages.DISH.EXIST };

      let coverImageUrl: string | undefined = undefined;
      if (coverImage) {
        coverImageUrl = await this.cloudinaryService.uploadFile(coverImage);
      }

      const dish = this.dishRepository.create({
        ...createDishDto,
        image: coverImageUrl,
        restaurant,
      });

      const result = await this.dishRepository.save(dish);

      return { status: HttpStatus.OK, message: messages.RESTAURANT.CATEGORY_LINKED, data: { id: result.id } };
    } catch (e) {
      console.error('Error :', e);
      return { status: HttpStatus.INTERNAL_SERVER_ERROR, errorMessage: messages.COMMON.INTERNAL_SERVER_ERROR };
    }
  }

  async getDishesByRestaurantId(restaurantId: string) {
    const dishes = await this.dishRepository.find({
      where: {
        restaurant: { id: restaurantId },
        status: STATUS.ACTIVE,
      },
      relations: ['restaurant'],
      order: { createdAt: 'DESC' },
    });

    return {
      status: HttpStatus.OK,
      message: messages.DISH.LIST,
      data: dishes,
    };
  }

}
