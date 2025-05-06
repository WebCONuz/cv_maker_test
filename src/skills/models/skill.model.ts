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

interface ISkillCreationAttr {
  name: string;
  type: "Programming" | "Design" | "Management";
  is_active: boolean;
  relation_id: number;
}

@Table({ tableName: "skills", timestamps: false })
export class Skill extends Model<Skill, ISkillCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Unique skill ID",
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ApiProperty({
    example: "JavaScript",
    description: "Name of the skill",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @ApiProperty({
    example: "Programming",
    description: "Type of skill",
    enum: ["Programming", "Design", "Management"],
  })
  @Column({
    type: DataType.ENUM("Programming", "Design", "Management"),
    allowNull: false,
  })
  declare type: "Programming" | "Design" | "Management";

  @ApiProperty({
    example: true,
    description: "Indicates if the skill is active",
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  declare is_active: boolean;

  @ForeignKey(() => Relation)
  @ApiProperty({
    example: 1,
    description: "Relation ID associated with the skill",
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare relation_id: number;

  @BelongsTo(() => Relation)
  relation: Relation;
}
