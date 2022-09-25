import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DeviceInfo } from 'src/devices/schemas/deviceInfo.model';
import { FilesService } from 'src/files/files.service';
import { Paginate } from 'src/utils';
import { Device } from './schemas/device.model';
import { CreateDeviceDto } from './dto/craete-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Op } from 'sequelize';

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(Device) private deviceRepository: typeof Device,
    @InjectModel(DeviceInfo) private infoRepository: typeof DeviceInfo,
    private fileService: FilesService
  ) {}

  async createDevice(dto: CreateDeviceDto, image?: Express.Multer.File) {
    let fileName: string = null;
    if (image) fileName = await this.fileService.createFile(image);

    const device = await this.deviceRepository.create({ ...dto, image: fileName });

    if (dto.info) {
      JSON.parse(dto.info.toString()).forEach((i) => {
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
    return await this.getDeviceById(id);
  }

  async getAllByParams(brandId?: number, typeId?: number, page?: number, limit?: number) {
    let devices;
    if (!brandId && !typeId) {
      devices = await this.deviceRepository.findAndCountAll({
        attributes: ["id", "name", "price", "image"],
        ...Paginate(page, limit)
      })
    }

    if (!brandId && typeId) {
      devices = await this.deviceRepository.findAndCountAll({
        where: { typeId },
        attributes: ["id", "name", "price", "image"],
        ...Paginate(page, limit)
      })
    }

    if (brandId && !typeId) {
      devices = await this.deviceRepository.findAndCountAll({
        where: { brandId },
        attributes: ["id", "name", "price", "image"],
        ...Paginate(page, limit)
      })
    }

    if (brandId && typeId) {
      devices = await this.deviceRepository.findAndCountAll({
        where: { typeId, brandId },
        attributes: ["id", "name", "price", "image"],
        ...Paginate(page, limit)
      })
    }
    if(!devices) throw new HttpException("Товары не найдены", HttpStatus.BAD_REQUEST);
  }

  async updateDevice(id: number, dto: UpdateDeviceDto) {
    const device = await this.getDeviceById(id);
    if(dto.info) {
      JSON.parse(dto.info.toString()).forEach(async (i) => {
        const deviceInfo = await this.infoRepository.findOne({where: {title: i.title, deviceId: device.id}});
        if (!deviceInfo) {
          await this.infoRepository.create({
            title: i.title,
            description: i.description,
            deviceId: device.id
          })
        } else {
          deviceInfo.description = i.description
          await deviceInfo.save();
        }
      })
    }
    for(let prop in dto) {
      if(prop !== "info") {
        device[prop] = dto[prop];
      }
    }
    return await device.save();
  }

  async deleteDevice(id: number) {
    await this.getDeviceById(id);
    return await this.deviceRepository.destroy({where: {id}})
  }

  async searchDeviceByName(name: string) {
    if(name) return await this.deviceRepository.findAndCountAll({
      where: {
        name: {[Op.like]: "%" + name + "%"}
      }
    })
  }

  private async getDeviceById(id: number) {
    const device = await this.deviceRepository.findOne({where: {id}, include: [{ model: DeviceInfo }]});
    if(!device) throw new HttpException("Товара не существует", HttpStatus.BAD_REQUEST);
    return device;
  }
}
