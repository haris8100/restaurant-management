import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, HttpStatus, Query } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { File as MulterFile } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateDishDto } from 'src/dish/dto/create-dish.dto';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) { }

  @Post()
  @UseInterceptors(FileInterceptor('coverImage'))
  create(@Body() createRestaurantDto: CreateRestaurantDto,
    @UploadedFile() file?: MulterFile) {
    return this.restaurantService.create(createRestaurantDto, file);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1, description: 'Page number for pagination' })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10, description: 'Number of items per page' })
  @ApiQuery({ name: 'name', required: false, type: String, example: 'burger', description: 'Search by restaurant name' })
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('name') name?: string,
  ) {
    return this.restaurantService.findAllWithCategories({ page, limit, name });
  }

  @Post(':id/categories/:categoryId')
  linkCategoryToRestaurant(
    @Param('id') restaurantId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return this.restaurantService.linkCategory(restaurantId, categoryId);
  }

  @Post(':id/dishes')
  @UseInterceptors(FileInterceptor('coverImage'))
  linkDishToRestaurant(
    @Param('id') restaurantId: string,
    @Body() createDishDto: CreateDishDto,
    @UploadedFile() file?: MulterFile
  ) {
    return this.restaurantService.linkDishToRestaurant(restaurantId, createDishDto, file);
  }

  @Get(':id/dishes')
  async getAllDishesByRestaurant(@Param('id') restaurantId: string) {
    return this.restaurantService.getDishesByRestaurantId(restaurantId);
  }
}
