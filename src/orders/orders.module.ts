import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartsModule } from 'src/carts/carts.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderDevices } from './schemas/orderDevices.model';
import { Order } from './schemas/orders.model';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    SequelizeModule.forFeature([Order, OrderDevices]),
    CartsModule
  ],
  exports: [
    OrdersService
  ]
})
export class OrdersModule {}
