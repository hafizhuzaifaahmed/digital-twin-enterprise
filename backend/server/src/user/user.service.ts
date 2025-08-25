import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const data: any = {
      user_id: dto.user_id,
      username: dto.username ?? undefined,
      email: dto.email ?? undefined,
      password: dto.password ?? undefined,
      role_id: dto.role_id ?? undefined,
    };
    return this.prisma.user.create({ data });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(user_id: number) {
    const user = await this.prisma.user.findUnique({ where: { user_id } });
    if (!user) throw new NotFoundException(`User ${user_id} not found`);
    return user;
  }

  async findAllWithRelations() {
    return this.prisma.user.findMany({
      include: {
        role: true,
        company: true,
      },
    });
  }

  async findOneWithRelations(user_id: number) {
    const user = await this.prisma.user.findUnique({
      where: { user_id },
      include: {
        role: true,
        company: true,
      },
    });
    if (!user) throw new NotFoundException(`User ${user_id} not found`);
    return user;
  }

  async update(user_id: number, dto: UpdateUserDto) {
    const data: any = {
      username: dto.username ?? undefined,
      email: dto.email ?? undefined,
      password: dto.password ?? undefined,
      role_id: dto.role_id ?? undefined,
    };
    return this.prisma.user.update({ where: { user_id }, data });
  }

  async remove(user_id: number) {
    return this.prisma.user.delete({ where: { user_id } });
  }
}
