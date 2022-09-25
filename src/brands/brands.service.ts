import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Brand } from './schemas/brand.model';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Op } from 'sequelize';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand) private brandRepository: typeof Brand) {}

  async createBrand(dto: CreateBrandDto) {
    return await this.brandRepository.create(dto);
  }

  async getAll() {
    return await this.brandRepository.findAndCountAll({
      attributes: ["id", "name"]
    });
  }

  async deleteBrand(id: number) {
    return await this.brandRepository.destroy({
      where: {id}
    })
  }

  async updateBrand(id: number, dto: UpdateBrandDto) {
    const brand = await this.brandRepository.findOne({
      where: {id}
    })
    if(!brand) return new HttpException(`Бренда с id ${id} не существует`, HttpStatus.BAD_REQUEST)
    brand.name = dto.name;
    return await brand.save();
  }

  async searchBrandByName(name: string) {
    if(name) return await this.brandRepository.findAndCountAll({
      where: {
        name: {[Op.like]: "%" + name + "%"}
      }
    })
  }
}
