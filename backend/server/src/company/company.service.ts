import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto.js';
import { UpdateCompanyDto } from './dto/update-company.dto.js';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCompanyDto) {
    // Map nulls to undefined for Prisma optional fields
    const data: any = {
      company_id: dto.company_id, // required by schema (no autoincrement)
      name: dto.name ?? undefined,
      created_by: dto.created_by ?? undefined,
    };
    return this.prisma.company.create({ data });
  }

  async findAll() {
    return this.prisma.company.findMany();
  }

  async findOne(company_id: number) {
    const company = await this.prisma.company.findUnique({ where: { company_id } });
    if (!company) throw new NotFoundException(`Company ${company_id} not found`);
    return company;
  }

  async update(company_id: number, dto: UpdateCompanyDto) {
    const data: any = {
      name: dto.name ?? undefined,
      created_by: dto.created_by ?? undefined,
    };
    return this.prisma.company.update({ where: { company_id }, data });
  }

  async remove(company_id: number) {
    return this.prisma.company.delete({ where: { company_id } });
  }
}
