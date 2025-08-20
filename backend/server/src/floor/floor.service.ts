import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFloorDto } from './dto/create-floor.dto';
import { UpdateFloorDto } from './dto/update-floor.dto';

@Injectable()
export class FloorService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateFloorDto) {
    const data: any = {
      floor_id: dto.floor_id,
      building_id: dto.building_id ?? undefined,
      rows: dto.rows ?? undefined,
      columns: dto.columns ?? undefined,
    };
    return this.prisma.floor.create({ data });
  }

  async findAll() {
    return this.prisma.floor.findMany();
  }

  async findOne(floor_id: number) {
    const floor = await this.prisma.floor.findUnique({ where: { floor_id } });
    if (!floor) throw new NotFoundException(`Floor ${floor_id} not found`);
    return floor;
  }

  async findAllWithRelations() {
    return this.prisma.floor.findMany({
      include: {
        building: true,
        room: { include: { table: true } },
      },
    });
  }

  async findOneWithRelations(floor_id: number) {
    const floor = await this.prisma.floor.findUnique({
      where: { floor_id },
      include: {
        building: true,
        room: { include: { table: true } },
      },
    });
    if (!floor) throw new NotFoundException(`Floor ${floor_id} not found`);
    return floor;
  }

  async update(floor_id: number, dto: UpdateFloorDto) {
    const data: any = {
      building_id: dto.building_id ?? undefined,
      rows: dto.rows ?? undefined,
      columns: dto.columns ?? undefined,
    };
    return this.prisma.floor.update({ where: { floor_id }, data });
  }

  async remove(floor_id: number) {
    return this.prisma.floor.delete({ where: { floor_id } });
  }
}
