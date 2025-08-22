import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateRoomDto) {
    const data: any = {
      room_id: dto.room_id,
      floor_id: dto.floor_id ?? undefined,
      cell_row: dto.cell_row ?? undefined,
      cell_column: dto.cell_column ?? undefined,
    };
    return this.prisma.room.create({ data });
  }

  async findAll() {
    return this.prisma.room.findMany();
  }

  async findOne(room_id: number) {
    const room = await this.prisma.room.findUnique({ where: { room_id } });
    if (!room) throw new NotFoundException(`Room ${room_id} not found`);
    return room;
  }

  async findAllWithRelations() {
    return this.prisma.room.findMany({
      include: {
        floor: true,
        table: true,
      },
    });
  }

  async findOneWithRelations(room_id: number) {
    const room = await this.prisma.room.findUnique({
      where: { room_id },
      include: {
        floor: true,
        table: true,
      },
    });
    if (!room) throw new NotFoundException(`Room ${room_id} not found`);
    return room;
  }

  async update(room_id: number, dto: UpdateRoomDto) {
    const data: any = {
      floor_id: dto.floor_id ?? undefined,
      cell_row: dto.cell_row ?? undefined,
      cell_column: dto.cell_column ?? undefined,
    };
    return this.prisma.room.update({ where: { room_id }, data });
  }

  async remove(room_id: number) {
    return this.prisma.room.delete({ where: { room_id } });
  }
}
