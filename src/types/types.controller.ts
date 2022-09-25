import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { TypesService } from './types.service';

@Controller('types')
export class TypesController {
  constructor(private typeService: TypesService) {}

  @Get()
  get() {
    return this.typeService.getAll();
  }

  @Post()
  create(@Body() dto: CreateTypeDto) {
    return this.typeService.createType(dto);
  }

  @Put("/:id")
  update(@Param("id") id: number, @Body() dto: UpdateTypeDto) {
    return this.typeService.updateType(id, dto);
  }

  @Delete("/:id")
  delete(@Param("id") id: number) {
    return this.typeService.deleteType(id);
  }

  @Get("/search")
  search(@Query("name") name: string) {
    return this.typeService.searchTypeByName(name)
  }
}
