import { BelongsToMany, ForeignKey, HasMany, HasOne, Model } from "sequelize-typescript";
import { Column, DataType, Table } from "sequelize-typescript";
import { Brand } from "src/brands/schemas/brand.model";
import { Type } from "./types.model";

@Table({tableName: "type_brands", createdAt: false, updatedAt: false})
export class TypeBrand extends Model {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Type)
  @Column({type: DataType.INTEGER})
  typeId: number;

  @ForeignKey(() => Brand)
  @Column({type: DataType.INTEGER})
  brandId: number;

  
}