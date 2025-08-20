import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateBuildingDto {
  @IsOptional()
  @IsString()
  name?: string | null;

  @IsOptional()
  @IsInt()
  company_id?: number | null;
}
