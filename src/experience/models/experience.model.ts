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

interface IExperienceCreationAttr {
  company_name: string;
  company_address: string;
  position: string;
  start_time: Date;
  end_time: Date;
  description: string;
  is_active: boolean;
  relation_id: number;
}

@Table({ tableName: "experience" })
export class Experience extends Model<Experience, IExperienceCreationAttr> {
  @ApiProperty({ example: 1, description: "Unique identifier" })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ApiProperty({ example: "Tech Corp", description: "Name of the company" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare company_name: string;

  @ApiProperty({
    example: "123 Silicon Valley, CA",
    description: "Company address",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare company_address: string;

  @ApiProperty({
    example: "Software Engineer",
    description: "Position held in the company",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare position: string;

  @ApiProperty({
    example: "2022-01-01",
    description: "Start date",
    type: String,
    format: "date",
  })
  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  declare start_time: Date;

  @ApiProperty({
    example: "2023-01-01",
    description: "End date",
    type: String,
    format: "date",
  })
  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  declare end_time: Date;

  @ApiProperty({
    example: "Worked on developing features for the mobile app.",
    description: "Job description",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare description: string;

  @ApiProperty({
    example: true,
    description: "Whether this experience is current/active",
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  declare is_active: boolean;

  @ApiProperty({ example: 101, description: "Foreign key to related entity" })
  @ForeignKey(() => Relation)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare relation_id: number;

  @BelongsTo(() => Relation)
  relation: Relation;
}
