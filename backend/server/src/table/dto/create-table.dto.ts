import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateTableDto {
  // Required because `table_id` has no autoincrement in Prisma schema
  @IsInt()
  table_id!: number;

  @IsOptional()
  @IsInt()
  room_id?: number | null;

  @IsOptional()
  @IsString()
  posittion?: string | null;
}
