import { BelongsTo, BelongsToMany, ForeignKey, HasMany, HasOne, Model } from "sequelize-typescript";
import { Column, DataType, Table } from "sequelize-typescript";
import { Device } from "src/devices/device.model";
import { User } from "src/users/user.model";

@Table({tableName: "ratings"})
export class Rating extends Model {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({type: DataType.INTEGER, allowNull: false})
  rate: number;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number

  @ForeignKey(() => Device)
  deviceId: number

  @BelongsTo(() => User)
  user: User

  @BelongsTo(() => Device)
  device: Device
}