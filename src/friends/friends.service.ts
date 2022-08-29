import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/user.model';
import { FollowDto } from './dto/follow.dto';
import { Folowers } from './friends.model';

export function Paginate(page: number = 1, limit: number = 10) {
  if (page <= 0 || limit <= 0) {
    throw new HttpException("Неверные параметры пагинации", HttpStatus.BAD_REQUEST)
  }
  return {
    limit,
    offset: page * limit - limit
  }
}

@Injectable()
export class FriendsService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Folowers) private folowers: typeof Folowers
  ) { }

  async getIncoming(userId: number, page?: number, limit?: number) {
    const user = await this.userRepository.findByPk(userId)
    if (!user) {
      throw new HttpException("Такого пользователя не существуе или неверный id пользователят", HttpStatus.NOT_FOUND)
    }

    const paginate = Paginate(page, limit);

    const users = await this.folowers.findAndCountAll({
      where: { recipientId: userId },
      attributes: [],
      include: [{
        model: User,
        as: "Sender",
        attributes: ["email", "id", "username", "smallimage", "link"]
      }],
      limit: paginate.limit,
      offset: paginate.offset
    });
    return users
  };

  async getOutGoing(userId: number, page?: number, limit?: number) {
    const user = await this.userRepository.findByPk(userId)
    if (!user) {
      throw new HttpException("Такого пользователя не существуе или неверный id пользователят", HttpStatus.NOT_FOUND)
    }
    const paginate = Paginate(page, limit)
    const users = await this.folowers.findAndCountAll({
      where: { senderId: userId },
      attributes: [],
      include: [{
        model: User,
        as: "Recipient",
        attributes: ["email", "id", "username", "smallimage", "link"]
      }],
      limit: paginate.limit,
      offset: paginate.offset
    });
    return users
  };

  async getMutual(userId: number, page?: number, limit?: number) {
    const user = await this.userRepository.findByPk(userId)
    if (!user) {
      throw new HttpException("Такого пользователя не существуе или неверный id пользователят", HttpStatus.NOT_FOUND)
    }
    const paginate = Paginate(page, limit);
    const users = await this.folowers.findAndCountAll({
      where: { senderId: userId },
      attributes: [],
      include: [{
        model: User,
        as: "Recipient",
        include: [{
          model: Folowers,
          as: "_Follows",
          where: { recipientId: userId },
          attributes: []
        }],
        attributes: ["email", "id", "username", "smallimage", "link"]
      }],
      limit: paginate.limit,
      offset: paginate.offset
    });
    return users
  }

  // async getOne(userId: number) {
  //   let user = await this.userRepository.findOne({
  //     where: {id: userId},
  //     attributes: ["id", "lastVisit", "isOnline", "banned", "link", "highimage", "smallimage", "username", "email"]
  //   }
  //   );
  //   return user;
  // };

  async getOnline(userId: number) { };

  async follow(dto: FollowDto) {
    if (dto.sender === dto.recipient) { throw new HttpException("Невозможно подписаться на собственный аккаунт", HttpStatus.BAD_REQUEST) }
    const sender = await this.userRepository.findByPk(dto.sender)
    const recipient = await this.userRepository.findByPk(dto.recipient)
    if (!sender || !recipient) {
      throw new HttpException("Пользователя не существует", HttpStatus.NOT_FOUND)
    }
    await sender.$add("follows", [dto.recipient])
    return HttpStatus.OK
  };

  async unfollow(dto: FollowDto) {
    if (dto.sender === dto.recipient) { throw new HttpException("Невозможно подписаться на собственный аккаунт", HttpStatus.BAD_REQUEST) }
    const sender = await this.userRepository.findByPk(dto.sender)
    const recipient = await this.userRepository.findByPk(dto.recipient)
    if (!sender || !recipient) {
      throw new HttpException("Пользователя не существует", HttpStatus.NOT_FOUND)
    }
    await sender.$remove("follows", [dto.recipient])
    return HttpStatus.OK
  };

  async search(userId,) { };


  async getAll() {
    const users = await this.userRepository.findAll()
    return users
  };


}
