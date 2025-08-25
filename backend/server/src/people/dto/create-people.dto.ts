import { IsInt, IsOptional, IsString, IsEmail } from 'class-validator';

export class CreatePeopleDto {
  // Required because `peopleid` has no autoincrement in Prisma schema
  @IsInt()
  peopleid!: number;

  @IsOptional()
  @IsString()
  name?: string | null;

  @IsOptional()
  @IsEmail()
  email?: string | null;

  @IsOptional()
  @IsString()
  phone?: string | null;

  @IsOptional()
  @IsInt()
  companyid?: number | null;

  @IsOptional()
  @IsInt()
  jobid?: number | null;
}
