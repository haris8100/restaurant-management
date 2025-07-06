import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishEntity } from 'src/dish/entities/dish.entity';
import { OrderEntity } from './entities/order.entity';
import { RazorpayService } from 'src/utils';

@Module({
  controllers: [OrderController],
  providers: [OrderService, RazorpayService],
  imports: [
      TypeOrmModule.forFeature([DishEntity, OrderEntity])
  ],
})
export class OrderModule {}
