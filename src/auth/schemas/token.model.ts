import { ForeignKey, Model } from "sequelize-typescript";
import { Column, DataType, Table } from "sequelize-typescript";
import { User } from "src/users/schemas/user.model";

interface Itoken {
  userId: number;
  token: string;
}


@Table({tableName: "tokens"})
export class Token extends Model<Token, Itoken> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number;

  @Column({type: DataType.STRING(510)})
  token: string;
}