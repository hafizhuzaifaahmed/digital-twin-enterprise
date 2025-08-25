import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
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
