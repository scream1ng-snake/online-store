import { IsNumber, IsString } from "class-validator";
import { DeviceInfo } from "src/devices/schemas/deviceInfo.model";

export class CreateDeviceDto {
  @IsString({message: "Поле должно быть строковым"})
  readonly name: string;

  @IsNumber({}, {message: "Поле должно быть числовым"})
  readonly price: number;

  @IsNumber({}, {message: "Поле должно быть числовым"})
  readonly brandId: number;

  @IsNumber({}, {message: "Поле должно быть числовым"})
  readonly typeId: number;

  @IsString({message: "Поле должно быть строковым"})
  readonly description: string;

  readonly info?: DeviceInfo[];
}