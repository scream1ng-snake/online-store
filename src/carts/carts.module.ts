import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cart } from './schemas/cart.model';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CartsController],
  providers: [CartsService],
  imports: [
    SequelizeModule.forFeature([Cart]),
    forwardRef(() => AuthModule),
  ],
  exports: [CartsService]
})
export class CartsModule {}
