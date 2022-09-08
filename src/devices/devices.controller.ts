import { Body, Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/craete-device.dto';

@Controller('devices')
export class DevicesController {
  constructor(private deviceService: DevicesService) {}

  @Post()
  @UseInterceptors(FileInterceptor("image"))
  create(@Body() dto: CreateDeviceDto, @UploadedFile() image?: Express.Multer.File) {
    return this.deviceService.create(dto, image);
  }

  @Get()
  getAll(
    @Query("page") page?: number, 
    @Query("limit") limit?: number,
    @Query('brandId') brandId?: number, 
    @Query("typeId") typeId?: number
  ) {
    return this.deviceService.getAll(brandId, typeId, page, limit);
  }

  @Get("/:id")
  getOne(@Param("id") id: number) {
    return this.deviceService.getOne(id);
  }
}
