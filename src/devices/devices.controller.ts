import { Controller, Get, Post } from '@nestjs/common';

@Controller('devices')
export class DevicesController {
  @Post()
  create() {}

  @Get()
  getAll() {}

  @Get("/:id")
  getOne() {}
}
