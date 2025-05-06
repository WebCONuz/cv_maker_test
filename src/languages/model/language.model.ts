import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Relation } from "../../relations/models/relation.models";

interface ILanguageCreationAttr {
  language: string;
  degree: "A2" | "C1" | "B1" | "B2";
  is_active: boolean;
  relation_id: number;
}

@Table({ tableName: "languages", timestamps: false })
export class Language extends Model<Language, ILanguageCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Til yozuvi uchun unikal ID",
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ApiProperty({
    example: "English",
    description: "Foydalanuvchi biladigan til nomi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare language: string;

  @ApiProperty({
    example: "B2",
    description: "Til darajasi: A2, B1, B2 yoki C1 bo'lishi mumkin",
    enum: ["A2", "B1", "B2", "C1"],
  })
  @Column({
    type: DataType.ENUM("A2", "B1", "B2", "C1"),
    allowNull: false,
  })
  declare degree: "A2" | "C1" | "B1" | "B2";

  @ApiProperty({
    example: true,
    description: "Til faollik holati (true yoki false)",
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  declare is_active: boolean;

  @ForeignKey(() => Relation)
  @ApiProperty({
    example: 3,
    description: "Relation jadvalidan foreign key (relation_id)",
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare relation_id: number;

  @BelongsTo(() => Relation)
  relation: Relation;
}
