import { IsInt, IsOptional } from 'class-validator';

export class CreateRoomDto {
  // Required because `room_id` has no autoincrement in Prisma schema
  @IsInt()
  room_id!: number;

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
