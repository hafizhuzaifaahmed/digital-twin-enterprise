import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateJobDto {
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
