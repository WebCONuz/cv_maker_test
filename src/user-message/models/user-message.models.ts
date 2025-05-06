import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IUserMessageCreationAttr {
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  message: string;
  star: number;
  phone: string;
}

@Table({ tableName: "user-message" })
export class UserMessage extends Model<UserMessage, IUserMessageCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
  })
  declare first_name: string;

  @Column({
    type: DataType.STRING,
  })
  declare last_name: string;

  @Column({
    type: DataType.STRING,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
  })
  declare subject: string;

  @Column({
    type: DataType.STRING,
  })
  declare message: string;

  @Column({
    type: DataType.INTEGER,
  })
  declare star: number;

  @Column({
    type: DataType.STRING,
  })
  declare phone: string;
}
