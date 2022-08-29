import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { TypesService } from './types.service';

@Controller('types')
export class TypesController {
  constructor(private typeService: TypesService) {}

  @Get()
  get() {
    return this.typeService.getAll();
  }

  @Post()
  create(@Body() typeDto: CreateTypeDto) {
    return this.typeService.create(typeDto);
  }
}
