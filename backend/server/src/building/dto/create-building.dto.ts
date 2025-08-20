import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateBuildingDto {
  // Required because `building_id` has no autoincrement in Prisma schema
  @IsInt()
  building_id!: number;

  @IsOptional()
  @IsString()
  name?: string | null;

  @IsOptional()
  @IsInt()
  company_id?: number | null;
}
