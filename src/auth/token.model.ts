import { ForeignKey, Model } from "sequelize-typescript";
import { Column, DataType, Table } from "sequelize-typescript";
import { User } from "src/users/user.model";

interface TokenCreationAttrs {
  user: any;
  refreshToken: string;
}


@Table({tableName: "tokens"})
export class Token extends Model<Token, TokenCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  user: number;

  @Column({type: DataType.STRING(510)})
  refreshToken: string;
}