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
    return await this.typeRepository.findAndCountAll({
      attributes: ["id", "name"]
    });
  }

  async deleteType(id: number) {
    return await this.typeRepository.destroy({
      where: {id}
    })
  }

  async updateType(id: number, dto: UpdateTypeDto) {
    const type = await this.typeRepository.findOne({
      where: {id}
    })
    if(!type) return new HttpException(`Типа с id ${id} не существует`, HttpStatus.BAD_REQUEST)
    type.name = dto.name;
    return await type.save();
  }

  async searchTypeByName(name: string) {
    if(name) return await this.typeRepository.findAndCountAll({
      where: {
        name: {[Op.like]: "%" + name + "%"}
      }
    })
  }
}
