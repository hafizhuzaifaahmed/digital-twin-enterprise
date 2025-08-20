import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';

@Injectable()
export class BuildingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateBuildingDto) {
    const data: any = {
      building_id: dto.building_id,
      name: dto.name ?? undefined,
      company_id: dto.company_id ?? undefined,
    };
    return this.prisma.building.create({ data });
  }

  async findAll() {
    return this.prisma.building.findMany();
  }

  async findOne(building_id: number) {
    const building = await this.prisma.building.findUnique({ where: { building_id } });
    if (!building) throw new NotFoundException(`Building ${building_id} not found`);
    return building;
  }

  async findAllWithRelations() {
    return this.prisma.building.findMany({
      include: {
        company: true,
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
    });
  }

  async findOneWithRelations(building_id: number) {
    const building = await this.prisma.building.findUnique({
      where: { building_id },
      include: {
        company: true,
        floor: { include: { room: { include: { table: true } } } },
        Renamedfunction: { include: { job: { include: { job_level: true } } } },
        process: { include: { process_task: { include: { task: true } } } },
      },
    });
    if (!building) throw new NotFoundException(`Building ${building_id} not found`);
    return building;
  }

  async update(building_id: number, dto: UpdateBuildingDto) {
    const data: any = {
      name: dto.name ?? undefined,
      company_id: dto.company_id ?? undefined,
    };
    return this.prisma.building.update({ where: { building_id }, data });
  }

  async remove(building_id: number) {
    return this.prisma.building.delete({ where: { building_id } });
  }
}
