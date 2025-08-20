import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateCompanyDto {
  // Required because `company_id` has no autoincrement in Prisma schema
  @IsInt()
  company_id!: number;

  @IsOptional()
  @IsString()
  name?: string | null;

  @IsOptional()
  @IsInt()
  created_by?: number | null;
}
