import { BelongsTo, BelongsToMany, ForeignKey, Model } from "sequelize-typescript";
import { Column, DataType, Table } from "sequelize-typescript";
import { Device } from "src/devices/schemas/device.model";
import { User } from "src/users/schemas/user.model";
import { OrderDevices } from "./orderDevices.model";

@Table({tableName: "orders", createdAt: false, updatedAt: false})
export class Order extends Model{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number

  @Column({type: DataType.BOOLEAN, defaultValue: false})
  confirmed: boolean

  @Column({type: DataType.BOOLEAN, defaultValue: false})
  paid: boolean

  @BelongsTo(() => User)
  user: User

  @BelongsToMany(() => Device, () => OrderDevices)
  devices: Device[];
}
