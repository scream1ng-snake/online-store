import { BelongsToMany, HasMany, Model } from "sequelize-typescript";
import { Column, DataType, Table } from "sequelize-typescript";
import { Device } from "src/devices/schemas/device.model";
import { TypeBrand } from "src/types/schemas/typeBrand.model";
import { Type } from "src/types/schemas/types.model";

interface BrandCreationAttrs {
  nmae: string
}

@Table({tableName: "brands"})
export class Brand extends Model<Brand, BrandCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({type: DataType.STRING, unique: true, allowNull: true})
  name: string;

  @HasMany(() => Device)
  devices: Device[];

  @BelongsToMany(() => Type, () => TypeBrand)
  types: Type[]
}