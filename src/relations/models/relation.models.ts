import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../../users/models/user.model";
import { Skill } from "../../skills/models/skill.model";
import { Language } from "../../languages/model/language.model";
import { Experience } from "../../experience/models/experience.model";
import { Education } from "../../education/models/education.model";
import { SocialMedia } from "../../social_media/models/social_media.model";

interface IRelationCreationAttr {
  user_id: number;
  is_active: boolean;
}

@Table({ tableName: "relations", timestamps: false })
export class Relation extends Model<Relation, IRelationCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ForeignKey(() => User)
  @ApiProperty({
    example: 1,
    description: "Foydalanuvchining unikal ID si",
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare user_id: number;

  @ApiProperty({
    example: true,
    description: "Foydalanuvchining statusi",
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  declare is_active: boolean;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Skill)
  skills: Skill[];

  @HasMany(() => Language)
  languages: Language[];

  @HasMany(() => Experience)
  experiences: Experience[];

  @HasMany(() => Education)
  educations: Education[];

  @HasMany(() => SocialMedia)
  social_media: SocialMedia[];
}
