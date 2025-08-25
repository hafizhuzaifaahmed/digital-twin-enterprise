import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateRoleDto) {
    const data: any = {
      role_id: dto.role_id,
      name: dto.name ?? undefined,
      description: dto.description ?? undefined,
    };
    return this.prisma.role.create({ data });
  }

  async findAll() {
    return this.prisma.role.findMany();
  }

  async findOne(role_id: number) {
    const role = await this.prisma.role.findUnique({ where: { role_id } });
    if (!role) throw new NotFoundException(`Role ${role_id} not found`);
    return role;
  }

  async findAllWithRelations() {
    return this.prisma.role.findMany({
      include: {
        user: true,
      },
    });
  }

  async findOneWithRelations(role_id: number) {
    const role = await this.prisma.role.findUnique({
      where: { role_id },
      include: {
        user: true,
      },
    });
    if (!role) throw new NotFoundException(`Role ${role_id} not found`);
    return role;
  }

  async update(role_id: number, dto: UpdateRoleDto) {
    const data: any = {
      name: dto.name ?? undefined,
      description: dto.description ?? undefined,
    };
    try {
      return await this.prisma.role.update({ where: { role_id }, data });
    } catch (e: any) {
      if (e?.code === 'P2025') throw new NotFoundException(`Role ${role_id} not found`);
      throw e;
    }
  }

  async remove(role_id: number) {
    try {
      return await this.prisma.role.delete({ where: { role_id } });
    } catch (e: any) {
      if (e?.code === 'P2025') throw new NotFoundException(`Role ${role_id} not found`);
      throw e;
    }
  }
}
