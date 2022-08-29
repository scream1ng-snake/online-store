import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DeviceInfo } from 'src/deviceInfo/deviceInfo.model';
import { FilesModule } from 'src/files/files.module';
import { Device } from './device.model';
import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';

@Module({
  controllers: [DevicesController],
  providers: [DevicesService],
  imports: [
    SequelizeModule.forFeature([Device, DeviceInfo]),
    FilesModule
  ]
})
export class DevicesModule {}
