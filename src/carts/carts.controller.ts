import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CartsService } from './carts.service';
import { UpdateCartDto } from './dto/updateCart.dto';

@UseGuards(JwtAuthGuard)
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
    return await this.cartService.update(updateCartDto, id);
  }
}
