import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { RestaurantEntity } from './entities/restaurant.entity';
import { DishEntity } from 'src/dish/entities/dish.entity';
import { CloudinaryService } from 'src/utils';

@Module({
  controllers: [RestaurantController],
  providers: [RestaurantService, CloudinaryService],
  imports: [
    TypeOrmModule.forFeature([CategoryEntity, RestaurantEntity, DishEntity])
  ]
})
export class RestaurantModule {}
