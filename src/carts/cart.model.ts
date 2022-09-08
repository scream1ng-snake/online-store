import { BelongsTo, BelongsToMany, ForeignKey, HasMany, HasOne, Model } from "sequelize-typescript";
import { Column, DataType, Table } from "sequelize-typescript";
import { CartDevices } from "src/cartDevices/cart_devices.model";
import { Device } from "src/devices/device.model";
import { User } from "src/users/user.model";

@Table({tableName: "carts", createdAt: false, updatedAt: false})
export class Cart extends Model {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number

  @BelongsTo(() => User)
  user: User

  @BelongsToMany(() => Device, () => CartDevices)
  devices: Device[];
}