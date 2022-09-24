import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Device } from 'src/devices/schemas/device.model';
import { Cart } from './schemas/cart.model';
import { UpdateCartDto } from './dto/updateCart.dto';

@Injectable()
export class CartsService {
  constructor(@InjectModel(Cart) private cartRepository: typeof Cart) { }

  async get(userId: number) {
    try {
      return await this.cartRepository.findOne({ where: { userId }, include: { model: Device, as: "devices", through: { attributes: [] }, attributes: ["id", "name", "price"] } })
    } catch (e) {
      return new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async create(userId: number) {
    return await this.cartRepository.create({ userId });
  }

  async update(updateCartDto: UpdateCartDto, userId: number) {
    try {
      const cart = await this.cartRepository.findOne({ where: { userId }, include: { model: Device, as: "devices", through: { attributes: [] }, attributes: ["id", "name", "price"] } })
      if (!cart) return new HttpException(`Корзина ${userId} не найдена`, HttpStatus.NOT_FOUND);
      cart.devices.map((i) => {
        cart.$remove("devices", i.id)
      })
      updateCartDto.devices.map((i) => {
        cart.$add("devices", i.id)
      })
      return HttpStatus.CREATED
    } catch (e) {
      return new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
// доделать бэкенд:
// только авторизованные пользователи могут подписываться друг на друга, писать сообщения, оформлять заказ
