import { IsInt, IsOptional, IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  // Required because `user_id` has no autoincrement in Prisma schema
  @IsInt()
  user_id!: number;

  @IsOptional()
  @IsString()
  username?: string | null;

  @IsOptional()
  @IsEmail()
  email?: string | null;

  @IsOptional()
  @IsString()
  password?: string | null;

  @IsOptional()
  @IsInt()
  role_id?: number | null;
}
