import { Body, Controller, Get, Post } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';

@Controller('brands')
export class BrandsController {
  constructor(private brandService: BrandsService) {}

  @Get()
  get() {
    return this.brandService.getAll();
  }

  @Post()
  create(@Body() dto: CreateBrandDto) {
    return this.brandService.create(dto);
  }
}
