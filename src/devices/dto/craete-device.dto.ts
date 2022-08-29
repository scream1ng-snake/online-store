import { DeviceInfo } from "src/deviceInfo/deviceInfo.model";

export class CreateDeviceDto {
  readonly name: string;

  readonly price: number;

  readonly brandId: number;

  readonly typeId: number;

  readonly info?: DeviceInfo[];
}