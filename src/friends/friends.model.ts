import { BelongsTo, ForeignKey, Model } from "sequelize-typescript";
import { Column, DataType, Table } from "sequelize-typescript";
import { User } from "src/users/user.model";

@Table({tableName: "folowers", createdAt: false, updatedAt: false})
export class Folowers extends Model<Folowers> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  senderId: number;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  recipientId: number;

  @BelongsTo(() => User, {foreignKey: "senderId", as: "Sender"})
  sender: User;

  @BelongsTo(() => User, {foreignKey: "recipientId", as: "Recipient"})
  recipient: User;
}