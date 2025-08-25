import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateProcessDto {
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
