import { BelongsToMany, HasMany, HasOne, Model } from "sequelize-typescript";
import { Column, DataType, Table } from "sequelize-typescript";
import { Token } from "src/auth/token.model";
import { Cart } from "src/carts/cart.model";
import { Folowers } from "src/friends/friends.model";
import { Rating } from "src/ratings/rating.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttrs {
  email: string;
  username: string;
  password: string;
  role?: string[];
  activationLink?: string;
}


@Table({tableName: "users"})
export class User extends Model<User, UserCreationAttrs> {
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

  @HasMany(() => Rating)
  ratings: Rating[]
  
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

  // у пользователя есть много друзей (подписок и подписчиков)
  // у пользователя есть подписки
  @BelongsToMany(() => User, {through: () => Folowers, as: 'Follows', foreignKey: "senderId", otherKey: "recipientId"})
  follows: User[];

  // у пользователя есть подписчики
  @BelongsToMany(() => User, {through: () => Folowers, as: 'Followers', foreignKey: "recipientId", otherKey: "senderId"})
  followers: User[];

  // ассоциаиция с промежуточной таблицей, для выполнения запросов с большой вложенностью
  @HasMany(() => Folowers, {as: "_Follows"})
  user_folowers: Folowers[]
}