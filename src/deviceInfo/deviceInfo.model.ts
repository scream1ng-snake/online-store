import { BelongsTo, BelongsToMany, ForeignKey, HasMany, HasOne, Model } from "sequelize-typescript";
import { Column, DataType, Table } from "sequelize-typescript";
import { Device } from "src/devices/device.model";

interface InfoCreationAttrs {
  title: string,
  description: string,
  deviceId: number
}

@Table({tableName: "device_info"})
export class DeviceInfo extends Model<DeviceInfo, InfoCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({type: DataType.STRING, allowNull: false})
  title: string;

  @Column({type: DataType.STRING, allowNull: false})
  description: string;

  @ForeignKey(() => Device)
  @Column({type: DataType.INTEGER})
  deviceId: number

  @BelongsTo(() => Device)
  device: Device
}