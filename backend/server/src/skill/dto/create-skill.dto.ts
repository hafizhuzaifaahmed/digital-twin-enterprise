import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateSkillDto {
  // Required because `skill_id` has no autoincrement in Prisma schema
  @IsInt()
  skill_id!: number;

  @IsOptional()
  @IsString()
  name?: string | null;

  @IsOptional()
  @IsString()
  description?: string | null;

  @IsOptional()
  @IsInt()
  level?: number | null;
}
