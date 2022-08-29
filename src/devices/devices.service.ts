import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DeviceInfo } from 'src/deviceInfo/deviceInfo.model';
import { FilesService } from 'src/files/files.service';
import { Paginate } from 'src/friends/friends.service';
import { Device } from './device.model';
import { CreateDeviceDto } from './dto/craete-device.dto';

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(Device) private deviceRepository: typeof Device,
    @InjectModel(DeviceInfo) private infoRepository: typeof DeviceInfo,
    private fileService: FilesService
  ) {}

  async create(dto: CreateDeviceDto, image?: Express.Multer.File) {
    let fileName: string = null;
    if (image) {
      fileName = await this.fileService.createFile(image);
    }
    
    const device = await this.deviceRepository.create({...dto, image: fileName});

    if (dto.info) {
      dto.info.forEach((i) => {
        this.infoRepository.create({
          title: i.title,
          description: i.description,
          deviceId: device.id
        })
      })
    }

    return device;
  }

  async getOne(id: number) {
    return await this.deviceRepository.findOne({where: {id}, include: [{model: DeviceInfo}]});
  }

  async getAll(brandId?: number, typeId?: number) {
    if(!brandId && !typeId) {
      return await this.deviceRepository.findAndCountAll({
        attributes: ["id", "name"],
        ...Paginate()
      })
    }

    if(!brandId && typeId) {
      return await this.deviceRepository.findAndCountAll({
        where: {typeId},
        attributes: ["id", "name"],
        ...Paginate()
      })
    }

    if(brandId && !typeId) {
      return await this.deviceRepository.findAndCountAll({
        where: {brandId},
        attributes: ["id", "name"],
        ...Paginate()
      })
    }

    if(brandId && typeId) {
      return await this.deviceRepository.findAndCountAll({
        where: {typeId, brandId},
        attributes: ["id", "name"],
        ...Paginate()
      })
    }

  }
}
