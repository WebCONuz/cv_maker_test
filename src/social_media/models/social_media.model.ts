import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Relation } from "../../relations/models/relation.models";

interface ISocialMediaCreationAttr {
  title: string;
  link: string;
  account_name: string;
  relation_id: number;
}

@Table({ tableName: "social-media" })
export class SocialMedia extends Model<SocialMedia, ISocialMediaCreationAttr> {
  @ApiProperty({ example: 1, description: "Unique identifier" })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ApiProperty({
    example: "Instagram",
    description: "Name of the social media platform",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare title: string;

  @ApiProperty({
    example: "https://instagram.com/username",
    description: "URL to the social media account",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare link: string;

  @ApiProperty({ example: true, description: "Whether the account is active" })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  declare is_active: boolean;

  @ApiProperty({
    example: "username",
    description: "Account name on the platform",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare account_name: string;

  @ApiProperty({ example: 1001, description: "Relation ID (e.g. user ID)" })
  @ForeignKey(() => Relation)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare relation_id: number;

  @BelongsTo(() => Relation)
  relation: Relation;
}
