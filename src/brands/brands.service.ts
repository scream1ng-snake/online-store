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
    const brands = await this.brandRepository.findAndCountAll({
      attributes: ["id", "name"]
    });
    if(!brands) throw new HttpException("Бренды не найдены", HttpStatus.BAD_REQUEST);
    return brands;
  }

  async deleteBrand(id: number) {
    const brand = await this.brandRepository.findOne({where: {id}});
    if (!brand) throw new HttpException("Бренд не найдены", HttpStatus.BAD_REQUEST);
    return await brand.destroy();
  }

  async updateBrand(id: number, dto: UpdateBrandDto) {
    const brand = await this.brandRepository.findOne({where: {id}})
    if(!brand) throw new HttpException(`Бренда с id ${id} не существует`, HttpStatus.BAD_REQUEST)
    brand.name = dto.name;
    return await brand.save();
  }

  async searchBrandByName(name: string) {
    const brand = await this.brandRepository.findAndCountAll({
      where: {name: {[Op.like]: "%" + name + "%"}}
    });
    if (!brand) throw new HttpException("Бренд не найдены", HttpStatus.BAD_REQUEST);
    return brand;
  }
}
