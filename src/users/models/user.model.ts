import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Role } from "../../roles/models/role.model";

interface IUserCreationAttr {
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  postcode: string;
  phone: string;
  email: string;
  password: string;
  about_text: string;
  role_id: number;
}

@Table({ tableName: "users" })
export class User extends Model<User, IUserCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Foydalanuvchi uchun takrorlanmaydigan 'id'si",
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ApiProperty({
    example: "Yusuf",
    description: "Foydalanuvchi ismi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare first_name: string;

  @ApiProperty({
    example: "Sirojiddinov",
    description: "Foydalanuvchi familiyasi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare last_name: string;

  @ApiProperty({
    example: "Chilonzor tumani 9-kv",
    description: "Foydalanuvchi turar manzili",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare address: string;

  @ApiProperty({
    example: "Tashkent shaxri",
    description: "Foydalanuvchi turar shaxrining nomi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare city: string;

  @ApiProperty({
    example: "123456",
    description: "Foydalanuvchi pochta raqami",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare postcode: string;

  @ApiProperty({
    example: "+998-99-999-99-99",
    description: "Foydalanuvchi telefon raqami",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare phone: string;

  @ApiProperty({
    example: "example@gmail.com",
    description: "Foydalanuvchi emaili",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare email: string;

  @ApiProperty({
    example: "qwerty1234",
    description: "Foydalanuvchi paroli",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @ApiProperty({
    example: "4 qator matn",
    description: "Foydalanuvchi haqida qoshimcha matn",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare about_text: string;

  @ForeignKey(() => Role)
  @ApiProperty({
    example: 1,
    description: "Foydalanuvchi roli",
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare role_id: number;

  @ApiProperty({
    example: true,
    description: "Foydalanuvchi statusi",
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare is_active: boolean;

  @BelongsTo(() => Role)
  role: Role;

  @ApiProperty({
    example: true,
    description: "Foydalanuvchi refresh tokeni",
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare refresh_token: string;

  @ApiProperty({
    example: true,
    description: "Foydalanuvchi refresh tokeni",
  })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4(),
  })
  declare activate_link: string;
}
