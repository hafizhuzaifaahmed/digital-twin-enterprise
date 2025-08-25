import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRenamedfunctionDto } from './dto/create-renamedfunction.dto';
import { UpdateRenamedfunctionDto } from './dto/update-renamedfunction.dto';

@Injectable()
export class RenamedfunctionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateRenamedfunctionDto) {
    const data: any = {
      function_id: dto.function_id,
      building_id: dto.building_id ?? undefined,
      name: dto.name ?? undefined,
    };
    return this.prisma.renamedfunction.create({ data });
  }

  async findAll() {
    return this.prisma.renamedfunction.findMany();
  }

  async findOne(function_id: number) {
    const renamedfunction = await this.prisma.renamedfunction.findUnique({ where: { function_id } });
    if (!renamedfunction) throw new NotFoundException(`Function ${function_id} not found`);
    return renamedfunction;
  }

  async findAllWithRelations() {
    return this.prisma.renamedfunction.findMany({
      include: {
        building: true,
        job: {
          include: {
            job_level: true,
            job_skill: { include: { skill: true } },
            job_task: { include: { task: true } },
            people: true,
          },
        },
      },
    });
  }

  async findOneWithRelations(function_id: number) {
    const renamedfunction = await this.prisma.renamedfunction.findUnique({
      where: { function_id },
      include: {
        building: true,
        job: {
          include: {
            job_level: true,
            job_skill: { include: { skill: true } },
            job_task: { include: { task: true } },
            people: true,
          },
        },
      },
    });
    if (!renamedfunction) throw new NotFoundException(`Function ${function_id} not found`);
    return renamedfunction;
  }

  async update(function_id: number, dto: UpdateRenamedfunctionDto) {
    const data: any = {
      building_id: dto.building_id ?? undefined,
      name: dto.name ?? undefined,
    };
    return this.prisma.renamedfunction.update({ where: { function_id }, data });
  }

  async remove(function_id: number) {
    return this.prisma.renamedfunction.delete({ where: { function_id } });
  }
}
