import { BelongsToMany, Model } from "sequelize-typescript";
import { Column, DataType, Table } from "sequelize-typescript";
import { User } from "src/users/user.model";
import { UserRoles } from "./user-roles.model";

interface RoleCreationAttrs {
  value: string;
  description: string;
}


@Table({tableName: "roles", createdAt: false, updatedAt: false})
export class Role extends Model<Role, RoleCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({type: DataType.STRING, allowNull: false, unique: true})
  value: string;

  @Column({type: DataType.STRING, allowNull: true})
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}