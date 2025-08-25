import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateJobDto {
  // Required because `job_id` has no autoincrement in Prisma schema
  @IsInt()
  job_id!: number;

  @IsOptional()
  @IsInt()
  function_id?: number | null;

  @IsOptional()
  @IsString()
  name?: string | null;

  @IsOptional()
  @IsInt()
  levelid?: number | null;
}
