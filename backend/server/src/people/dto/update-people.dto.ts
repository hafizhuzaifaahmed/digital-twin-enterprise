import { IsInt, IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdatePeopleDto {
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
