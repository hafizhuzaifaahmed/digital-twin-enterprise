import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  // Required because `task_id` has no autoincrement in Prisma schema
  @IsInt()
  task_id!: number;

  @IsOptional()
  @IsString()
  name?: string | null;

  @IsOptional()
  @IsString()
  description?: string | null;

  @IsOptional()
  @IsInt()
  duration?: number | null;

  @IsOptional()
  @IsInt()
  minlevel?: number | null;
}
