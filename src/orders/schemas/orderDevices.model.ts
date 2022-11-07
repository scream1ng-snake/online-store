import { ForeignKey, Model } from "sequelize-typescript";
import { Column, DataType, Table } from "sequelize-typescript";
import { Device } from "src/devices/schemas/device.model";
import { Order } from "./orders.model";

@Table({tableName: "order_devices", createdAt: false, updatedAt: false})
export class OrderDevices extends Model {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Order)
  @Column({type: DataType.INTEGER})
  orderId: number;

  @ForeignKey(() => Device)
  @Column({type: DataType.INTEGER})
  deviceId: number;
}