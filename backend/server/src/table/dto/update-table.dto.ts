import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateTableDto {
  @IsOptional()
  @IsInt()
  room_id?: number | null;

  @IsOptional()
  @IsString()
  posittion?: string | null;
}
