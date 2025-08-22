import { IsInt, IsOptional } from 'class-validator';

export class UpdateRoomDto {
  @IsOptional()
  @IsInt()
  floor_id?: number | null;

  @IsOptional()
  @IsInt()
  cell_row?: number | null;

  @IsOptional()
  @IsInt()
  cell_column?: number | null;
}
