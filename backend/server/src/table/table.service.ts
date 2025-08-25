import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';

@Injectable()
export class TableService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTableDto) {
    const data: any = {
      table_id: dto.table_id,
      room_id: dto.room_id ?? undefined,
      posittion: dto.posittion ?? undefined,
    };
    return this.prisma.table.create({ data });
  }

  async findAll() {
    return this.prisma.table.findMany();
  }

  async findOne(table_id: number) {
    const table = await this.prisma.table.findUnique({ where: { table_id } });
    if (!table) throw new NotFoundException(`Table ${table_id} not found`);
    return table;
  }

  async findAllWithRelations() {
    return this.prisma.table.findMany({
      include: {
        room: true,
      },
    });
  }

  async findOneWithRelations(table_id: number) {
    const table = await this.prisma.table.findUnique({
      where: { table_id },
      include: {
        room: true,
      },
    });
    if (!table) throw new NotFoundException(`Table ${table_id} not found`);
    return table;
  }

  async update(table_id: number, dto: UpdateTableDto) {
    const data: any = {
      room_id: dto.room_id ?? undefined,
      posittion: dto.posittion ?? undefined,
    };
    try {
      return await this.prisma.table.update({ where: { table_id }, data });
    } catch (e: any) {
      if (e?.code === 'P2025') throw new NotFoundException(`Table ${table_id} not found`);
      throw e;
    }
  }

  async remove(table_id: number) {
    try {
      return await this.prisma.table.delete({ where: { table_id } });
    } catch (e: any) {
      if (e?.code === 'P2025') throw new NotFoundException(`Table ${table_id} not found`);
      throw e;
    }
  }
}
