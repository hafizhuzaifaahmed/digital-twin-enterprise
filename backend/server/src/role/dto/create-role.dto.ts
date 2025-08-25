import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  // Required because `role_id` has no autoincrement in Prisma schema
  @IsInt()
  role_id!: number;

  @IsOptional()
  @IsString()
  name?: string | null;

  @IsOptional()
  @IsString()
  description?: string | null;
}
