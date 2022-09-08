import { Device } from "src/devices/device.model";

export class UpdateCartDto {
  readonly devices: Device[];
  readonly userId: number;
  readonly id: number;
  readonly image?: string
}
