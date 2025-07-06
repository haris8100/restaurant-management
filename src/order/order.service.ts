import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto, PayOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderEntity } from './entities/order.entity';
import { DishEntity } from 'src/dish/entities/dish.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { messages } from 'src/config/messages';
import { RazorpayService } from 'src/utils';

@Injectable()
export class OrderService {

  constructor(
    private readonly razorpayService: RazorpayService,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(DishEntity)
    private readonly dishRepository: Repository<DishEntity>,
  ) { }

  async create(createOrderDto: CreateOrderDto) {

    const dishes = await this.dishRepository.findBy({ id: In(createOrderDto.dishIds) });
    if (!dishes.length) {
      return { status: HttpStatus.BAD_REQUEST, errorMessage: messages.DISH.DISHES_NOT_FOUND };
    }

    const totalPrice = dishes.reduce((sum, dish) => sum + +dish.price, 0);

    const order = this.orderRepository.create({
      userId: createOrderDto.userId,
      dishes,
      totalPrice,
      paymentStatus: 'pending',
    });

    const savedOrder = await this.orderRepository.save(order);

    return {
      status: HttpStatus.OK,
      message: messages.ORDER.CREATED,
      data: { id: savedOrder.id },
    };
  }

  async findAll() {
    const orders = await this.orderRepository.find({
      relations: ['dishes'],
      order: { createdAt: 'DESC' },
    });

    return {
      status: HttpStatus.OK,
      message: messages.ORDER.LIST,
      data: orders,
    };
  }

  async payForOrder(orderId: string, payOrderDto: PayOrderDto) {
    const order = await this.orderRepository.findOne({
      where: { id: orderId, paymentStatus: 'pending' },
    });

    if (!order) {
      return { status: HttpStatus.BAD_REQUEST, errorMessage: messages.ORDER.NOT_FOUND };
    }

    if (order.paymentStatus === 'paid') {
      return { status: HttpStatus.BAD_REQUEST, errorMessage: messages.ORDER.ALREADY_PAID };
    }

    if (+order.totalPrice !== +payOrderDto.amount) {
      return { status: HttpStatus.BAD_REQUEST, errorMessage: messages.ORDER.INVALID_PAYMENT };
    }

    const amount = payOrderDto.amount;
    const paymentResult = await this.razorpayService.createRazorpayOrder(amount);

    if (paymentResult.status !== HttpStatus.OK) {
      return { status: paymentResult.status, errorMessage: paymentResult.message };
    }

    order.paymentStatus = 'paid';
    await this.orderRepository.save(order);

    return {
      status: HttpStatus.OK,
      message: messages.ORDER.PAYMENT_SUCCESS,
      data: {
        orderId: order.id,
        paymentResult: paymentResult
      },
    };
  }
}
