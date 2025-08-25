import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

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

  async findAllWithRelations() {
    return this.prisma.company.findMany({
      include: {
        user: true,
        people: true,
        building: {
          include: {
            floor: {
              include: {
                room: {
                  include: { table: true },
                },
              },
            },
            Renamedfunction: {
              include: {
                job: {
                  include: {
                    job_level: true,
                    job_skill: { include: { skill: true } },
                    job_task: { include: { task: { include: { task_skill: { include: { skill: true } } } } } },
                    people: true,
                  },
                },
              },
            },
            process: {
              include: {
                process_task: { include: { task: true } },
              },
            },
          },
        },
      },
    });
  }

  async findOneWithRelations(company_id: number) {
    const company = await this.prisma.company.findUnique({
      where: { company_id },
      include: {
        user: true,
        people: true,
        building: {
          include: {
            floor: { include: { room: { include: { table: true } } } },
            Renamedfunction: {
              include: {
                job: {
                  include: {
                    job_level: true,
                    job_skill: { include: { skill: true } },
                    job_task: { include: { task: true } },
                    people: true,
                  },
                },
              },
            },
            process: { include: { process_task: { include: { task: true } } } },
          },
        },
      },
    });
    if (!company) throw new NotFoundException(`Company ${company_id} not found`);
    return company;
  }

  async update(company_id: number, dto: UpdateCompanyDto) {
    const data: any = {
      name: dto.name ?? undefined,
      created_by: dto.created_by ?? undefined,
    };
    try {
      return await this.prisma.company.update({ where: { company_id }, data });
    } catch (e: any) {
      if (e?.code === 'P2025') throw new NotFoundException(`Company ${company_id} not found`);
      throw e;
    }
  }

  async remove(company_id: number) {
    try {
      return await this.prisma.company.delete({ where: { company_id } });
    } catch (e: any) {
      if (e?.code === 'P2025') throw new NotFoundException(`Company ${company_id} not found`);
      throw e;
    }
  }
}

