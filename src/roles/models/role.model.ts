import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "../../users/models/user.model";

interface IRoleCreationAttr {
  name: string;
  is_active: boolean;
}

@Table({ tableName: "roles", timestamps: false })
export class Role extends Model<Role, IRoleCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Rol uchun takrorlanmaydigan qiymat",
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ApiProperty({
    example: "admin",
    description: "Rol nomi (masalan: admin, user, moderator)",
  })
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare name: string;

  @ApiProperty({
    example: true,
    description: "Rol faol yoki yo'qligini bildiradi",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare is_active: boolean;

  @HasMany(()=>User)
  users:User[];
}
