import { Column, DataType, HasOne, Model, Table } from "sequelize-typescript";
import { User } from "../../users/models/user.model";

interface IMediaCreationAttr {
  media_name: string;
  is_active: boolean;
}

@Table({ tableName: "media" })
export class Media extends Model<Media, IMediaCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  media_name: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  is_active: boolean;

  @HasOne(() => User)
  user: User;
}
