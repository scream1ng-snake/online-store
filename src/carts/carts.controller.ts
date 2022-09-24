import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CartsService } from './carts.service';
import { UpdateCartDto } from './dto/updateCart.dto';

@Controller('carts')
export class CartsController {
  constructor(private cartService: CartsService) {}

  @Get("/:id")
  async get(@Param("id") id: number) {
    return await this.cartService.get(id);
  }

  @Post("/:id")
  async updateCart(
    @Param("id") id: number,
    @Body() updateCartDto: UpdateCartDto
  ) {
    console.log(updateCartDto, id)
    return await this.cartService.update(updateCartDto, id);
  }
}
