import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/craete-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Controller('devices')
export class DevicesController {
  constructor(private deviceService: DevicesService) {}

  @Get("/search")
  search(@Query("name") name: string) {
    return this.deviceService.searchDeviceByName(name)
  }

  @Post()
  @UseInterceptors(FileInterceptor("image"))
  create(@Body() dto: CreateDeviceDto, @UploadedFile() image?: Express.Multer.File) {
    return this.deviceService.createDevice(dto, image);
  }

  @Get()
  getAll(
    @Query("page") page?: number, 
    @Query("limit") limit?: number,
    @Query('brandId') brandId?: number, 
    @Query("typeId") typeId?: number
  ) {
    return this.deviceService.getAllByParams(brandId, typeId, page, limit);
  }

  @Get("/:id")
  getOne(@Param("id") id: number) {
    return this.deviceService.getOne(id);
  }

  @Put("/:id")
  update(@Param("id") id: number, @Body() dto: UpdateDeviceDto) {
    return this.deviceService.updateDevice(id, dto);
  }

  @Delete("/:id")
  delete(@Param("id") id: number) {
    return this.deviceService.deleteDevice(id);
  }

  
}
