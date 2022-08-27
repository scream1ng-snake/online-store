import { Controller, Get, Post } from '@nestjs/common';

@Controller('brands')
export class BrandsController {

  @Get()
  get() {}

  @Post()
  create() {}
}
