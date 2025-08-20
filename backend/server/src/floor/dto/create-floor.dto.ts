import { IsInt, IsOptional } from 'class-validator';

export class CreateFloorDto {
  // Required because `floor_id` has no autoincrement in Prisma schema
  @IsInt()
  floor_id!: number;

  @IsOptional()
  @IsInt()
  building_id?: number | null;

  @IsOptional()
  @IsInt()
  rows?: number | null;

  @IsOptional()
  @IsInt()
  columns?: number | null;
}
