import { IsNumber, IsOptional, IsString } from "class-validator";
import { DeviceInfo } from "src/devices/schemas/deviceInfo.model";

export class UpdateDeviceDto {
  @IsString({message: "Поле должно быть строковым"})
  @IsOptional()
  readonly name?: string;

  @IsNumber({}, {message: "Поле должно быть числовым"})
  @IsOptional()
  readonly price?: number;

  @IsNumber({}, {message: "Поле должно быть числовым"})
  @IsOptional()
  readonly brandId?: number;

  @IsNumber({}, {message: "Поле должно быть числовым"})
  @IsOptional()
  readonly typeId?: number;

  @IsString({message: "Поле должно быть строковым"})
  @IsOptional()
  readonly description?: string;

  readonly info?: DeviceInfo[];
}

