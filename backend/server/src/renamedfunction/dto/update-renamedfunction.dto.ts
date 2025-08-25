import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateRenamedfunctionDto {
  @IsOptional()
  @IsInt()
  building_id?: number | null;

  @IsOptional()
  @IsString()
  name?: string | null;
}
