import { BelongsToMany, HasMany, HasOne, Model } from "sequelize-typescript";
import { Column, DataType, Table } from "sequelize-typescript";
import { Token } from "src/auth/schemas/token.model";
import { Cart } from "src/carts/schemas/cart.model";
import { Role } from "src/roles/schemas/roles.model";
import { UserRoles } from "src/roles/schemas/user-roles.model";

interface IUser {
  email: string;
  username: string;
  password: string;
  role?: string[];
  activationLink?: string;
}


@Table({tableName: "users"})
export class User extends Model<User, IUser> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email: string;

  @Column({type: DataType.STRING, allowNull: false})
  username: string;

  @Column({type: DataType.STRING, allowNull: true})
  password: string;

  @Column({type: DataType.STRING, allowNull: true})
  smallimage: string;

  @Column({type: DataType.STRING, allowNull: true})
  highimage: string;

  @HasOne(() => Cart)
  cart: Cart
  
  @Column({type: DataType.STRING, unique: true, allowNull: true})
  link: string;
  
  @Column({type: DataType.STRING, allowNull: false})
  activationLink: string;
  
  @Column({type: DataType.BOOLEAN, defaultValue: false})
  banned: boolean;

  @Column({type: DataType.STRING, allowNull: true})
  banReason: string;

  @Column({type: DataType.BOOLEAN, defaultValue: false})
  isActivated: boolean;

  @Column({type: DataType.BOOLEAN, defaultValue: false})
  isOnline: boolean;

  @Column({type: DataType.DATE})
  lastVisit: Date;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasOne(() => Token)
  tokens: Token; 
}