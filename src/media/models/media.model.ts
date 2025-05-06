import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IMediaCreationAttr {
  media_name: string;
  table_name: string;
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
    type: DataType.STRING,
    allowNull: false,
  })
  table_name: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  is_active: boolean;
}
