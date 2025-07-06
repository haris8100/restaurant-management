import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
const Razorpay = require('razorpay');
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class RazorpayService {
  private razorpay: any;

  constructor(private configService: ConfigService) {
    this.razorpay = new Razorpay({
      key_id: this.configService.get<string>('RAZORPAY_KEY_ID'),
      key_secret: this.configService.get<string>('RAZORPAY_KEY_SECRET'),
    });
  }

  async createRazorpayOrder(amountInRupees: number) {
    const amountInPaise = amountInRupees * 100;

    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`,
    };

    try {
      const order = await this.razorpay.orders.create(options);
      return {
        status: HttpStatus.OK,
        message: 'Razorpay order created',
        data: order,
      };
    } catch (err) {
      throw new HttpException('Failed to create Razorpay order', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  verifySignature(body: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    const keySecret = this.configService.get<string>('RAZORPAY_KEY_SECRET');
    if (!keySecret) {
      throw new HttpException('Razorpay key secret is not configured', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      throw new HttpException('Invalid signature', HttpStatus.BAD_REQUEST);
    }

    return {
      status: HttpStatus.OK,
      message: 'Payment verified',
    };
  }
}
