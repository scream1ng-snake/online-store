import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) { }

  // @Get("/:id")
  // async get(@Param("id") id: number) {
  //   return await this.ordersService;
  // }

  // @Post("/:id")
  // async updateCart(
  //   @Param("id") id: number) {
  //   return await this.ordersService;
  // }
}
