import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateRenamedfunctionDto {
  // Required because `function_id` has no autoincrement in Prisma schema
  @IsInt()
  function_id!: number;

  @IsOptional()
  @IsInt()
  building_id?: number | null;

  @IsOptional()
  @IsString()
  name?: string | null;
}
