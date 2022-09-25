import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Controller('brands')
export class BrandsController {
  constructor(private brandService: BrandsService) {}

  @Get()
  get() {
    return this.brandService.getAll();
  }

  @Post()
  create(@Body() dto: CreateBrandDto) {
    return this.brandService.createBrand(dto);
  }

  @Put("/:id")
  update(@Param("id") id: number, @Body() dto: UpdateBrandDto) {
    return this.brandService.updateBrand(id, dto);
  }

  @Delete("/:id")
  delete(@Param("id") id: number) {
    return this.brandService.deleteBrand(id);
  }

  @Get("/search")
  search(@Query("name") name: string) {
    return this.brandService.searchBrandByName(name)
  }
}
