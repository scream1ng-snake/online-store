import { Blob } from "buffer";
import { BelongsTo, BelongsToMany, ForeignKey, HasMany, HasOne, Model } from "sequelize-typescript";
import { Column, DataType, Table } from "sequelize-typescript";
import { Brand } from "src/brands/brand.model";
import { CartDevices } from "src/cartDevices/cart_devices.model";
import { Cart } from "src/carts/cart.model";
import { DeviceInfo } from "src/deviceInfo/deviceInfo.model";
import { Rating } from "src/ratings/rating.model";
import { Type } from "src/types/types.model";


interface DeviceCreationAttrs {
  name: string,
  price: number,
  brandId: number,
  typeId: number,
  image?: string,
  info?: DeviceInfo[]
}


@Table({tableName: "devices"})
export class Device extends Model<Device, DeviceCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({type: DataType.STRING, unique: true, allowNull: false})
  name: string;

  @Column({type: DataType.INTEGER, allowNull: false})
  price: number;
  
  @Column({type: DataType.INTEGER, allowNull: true})
  rating: number;

  @Column({type: DataType.STRING, allowNull: false})
  image: string;

  @BelongsToMany(() => Cart, () => CartDevices)
  carts: Cart[];

  @ForeignKey(() => Type)
  @Column({type: DataType.INTEGER})
  typeId: number;
  
  @BelongsTo(() => Type)
  type: Type;



  @ForeignKey(() => Brand)
  @Column({type: DataType.INTEGER})
  brandId: number;
  
  @BelongsTo(() => Brand)
  brand: Brand;



  @HasMany(() => Rating)
  ratings: Rating[];

  @HasMany(() => DeviceInfo)
  info: DeviceInfo[];
}