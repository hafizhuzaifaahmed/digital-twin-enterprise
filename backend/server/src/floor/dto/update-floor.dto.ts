import { IsInt, IsOptional } from 'class-validator';

export class UpdateFloorDto {
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
