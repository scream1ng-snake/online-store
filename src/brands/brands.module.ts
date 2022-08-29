import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Brand } from './brand.model';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';

@Module({
  controllers: [BrandsController],
  providers: [BrandsService],
  imports: [
    SequelizeModule.forFeature([Brand]),
  ]
})
export class BrandsModule {}
