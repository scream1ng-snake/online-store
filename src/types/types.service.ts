import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { Type } from './schemas/types.model';

@Injectable()
export class TypesService {
  constructor(@InjectModel(Type) private typeRepository: typeof Type) {}

  async createType(dto: CreateTypeDto) {
    return await this.typeRepository.create(dto);
  }

  async getAll() {
    const types = await this.typeRepository.findAndCountAll({
      attributes: ["id", "name"]
    });
    if (!types) throw new HttpException("Типы не найдены", HttpStatus.BAD_REQUEST);
    return types;
  }

  async deleteType(id: number) {
    const type = await this.getTypeById(id);
    return await type.destroy();
  }

  async updateType(id: number, dto: UpdateTypeDto) {
    const type = await this.getTypeById(id);
    type.name = dto.name;
    return await type.save();
  }

  async searchTypeByName(name: string) {
    const type = await this.typeRepository.findAndCountAll({
      where: {
        name: {[Op.like]: "%" + name + "%"}
      }
    })
    if (!type) throw new HttpException("Тип не найден", HttpStatus.BAD_REQUEST);
    return type
  }

  private async getTypeById(id: number) {
    const type = await this.typeRepository.findOne({
      where: {id}
    })
    if(!type) throw new HttpException(`Типа с id ${id} не существует`, HttpStatus.BAD_REQUEST);
    return type;
  }
}
