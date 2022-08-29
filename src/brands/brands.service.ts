import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Paginate } from 'src/friends/friends.service';
import { Brand } from './brand.model';
import { CreateBrandDto } from './dto/create-brand.dto';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand) private brandRepository: typeof Brand) {}

  async create(dto: CreateBrandDto) {
    return await this.brandRepository.create(dto);
  }

  async getAll() {
    const paginate = Paginate();
    return await this.brandRepository.findAndCountAll({
      attributes: ["id", "name"],
      limit: paginate.limit,
      offset: paginate.offset
    });
  }
}
