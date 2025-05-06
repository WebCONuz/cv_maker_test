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

interface IEducationCreationAttr {
  title: string;
  start_time: Date;
  end_time: Date;
  position: string;
  faculty: string;
  description: string;
  relation_id: number;
  is_active: boolean;
}

@Table({ tableName: "education", timestamps: false })
export class Education extends Model<Education, IEducationCreationAttr> {
  @ApiProperty({ example: 1, description: "Unique ID" })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ApiProperty({
    example: "Tashkent University of Information Technologies",
    description: "Education title",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare title: string;

  @ApiProperty({
    example: "2020-09-01",
    description: "Start date of education",
  })
  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  declare start_time: Date;

  @ApiProperty({ example: "2024-06-30", description: "End date of education" })
  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  declare end_time: Date;

  @ApiProperty({
    example: "Student",
    description: "Position held during education",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare position: string;

  @ApiProperty({
    example: "Computer Science",
    description: "Faculty or specialization",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare faculty: string;

  @ApiProperty({
    example: "Studied software engineering and algorithms.",
    description: "Detailed description",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare description: string;

  @ApiProperty({ example: 1001, description: "Foreign key to related entity" })
  @ForeignKey(() => Relation)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare relation_id: number;

  @ApiProperty({
    example: true,
    description: "Is the education currently active?",
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  declare is_active: boolean;

  @BelongsTo(() => Relation)
  relation: Relation;
}
