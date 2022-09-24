import { ForeignKey, Model } from "sequelize-typescript";
import { Column, DataType, Table } from "sequelize-typescript";
import { Cart } from "src/carts/schemas/cart.model";
import { Device } from "src/devices/schemas/device.model";

@Table({tableName: "cart_devices", createdAt: false, updatedAt: false})
export class CartDevices extends Model {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Cart)
  @Column({type: DataType.INTEGER})
  cartId: number;

  @ForeignKey(() => Device)
  @Column({type: DataType.INTEGER})
  deviceId: number;

  
}