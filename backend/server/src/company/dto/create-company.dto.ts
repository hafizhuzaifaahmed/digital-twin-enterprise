export class CreateCompanyDto {
  // Required because `company_id` has no autoincrement in Prisma schema
  company_id!: number;
  name?: string | null;
  created_by?: number | null;
}
