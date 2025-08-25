import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateProcessDto {
  // Required because `process_id` has no autoincrement in Prisma schema
  @IsInt()
  process_id!: number;

  @IsOptional()
  @IsInt()
  building_id?: number | null;

  @IsOptional()
  @IsString()
  name?: string | null;

  @IsOptional()
  @IsString()
  description?: string | null;

  @IsOptional()
  @IsInt()
  duration?: number | null;
}
