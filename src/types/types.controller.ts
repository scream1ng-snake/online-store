import { Controller, Get, Post } from '@nestjs/common';

@Controller('types')
export class TypesController {
  @Get()
  get() {}

  @Post()
  create() {}
}
