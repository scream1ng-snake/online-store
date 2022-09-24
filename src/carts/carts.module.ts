import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cart } from './schemas/cart.model';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';

@Module({
  controllers: [CartsController],
  providers: [CartsService],
  imports: [
    SequelizeModule.forFeature([Cart]),
  ],
  exports: [CartsService]
})
export class CartsModule {}
