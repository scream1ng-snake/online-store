import { BelongsToMany, HasMany, HasOne, Model } from "sequelize-typescript";
import { Column, DataType, Table } from "sequelize-typescript";
import { Device } from "src/devices/device.model";
import { TypeBrand } from "src/types/typeBrand.model";
import { Type } from "src/types/types.model";

@Table({tableName: "brands"})
export class Brand extends Model {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({type: DataType.STRING, unique: true, allowNull: true})
  name: string;

  @HasMany(() => Device)
  devices: Device[];

  @BelongsToMany(() => Type, () => TypeBrand)
  types: Type[]
}