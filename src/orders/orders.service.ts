import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CartsService } from 'src/carts/carts.service';
import { Device } from 'src/devices/schemas/device.model';
import { Order } from './schemas/orders.model';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order) private orderRepository: typeof Order, private cartService: CartsService) {}

  async get(orderId: number) {
    return this.getOrderById(orderId);
  }

  async getAll(params: OrderSearchingParams) {
    return this.getAllWithParams(params);
  }

  async create(userId: number) {
    const cart = await this.cartService.get(userId);
    const order = await this.orderRepository.create({ userId });
    cart.devices.map((i) => {
      order.$add("devices", i.id)
    })
  }

  async payOrder(orderId: number) {
    const order = await this.getOrderById(orderId);
    order.paid = true;
    order.save();
  }

  async confirmOrder(orderId: number) {
    const order = await this.getOrderById(orderId);
    order.confirmed = true;
    order.save();
  }

  private async getOrderById(id: number) {
    const order = await this.orderRepository.findOne({ where: { id }, include: { model: Device, as: "devices", through: { attributes: [] }, attributes: ["id", "name", "price"] } })
    if (!order) throw new HttpException("Заказ не найден", HttpStatus.NOT_FOUND);
    return order
  }

  private async getAllWithParams({userId, confirmed, paid}: OrderSearchingParams) {
    let orders;
    if (!confirmed && !paid) {
      orders = await this.orderRepository.findAndCountAll({
        where: { userId }
      })
    }

    if (!confirmed && paid) {
      orders = await this.orderRepository.findAndCountAll({
        where: { userId, paid }
      })
    }

    if (confirmed && !paid) {
      orders = await this.orderRepository.findAndCountAll({
        where: { userId, confirmed }
      })
    }

    if (confirmed && paid) {
      orders = await this.orderRepository.findAndCountAll({
        where: { userId, confirmed, paid }
      })
    }
    if(!orders) throw new HttpException("Заказы не найдены", HttpStatus.NOT_FOUND);
    return orders
  }
}
