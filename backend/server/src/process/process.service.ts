import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProcessDto } from './dto/create-process.dto';
import { UpdateProcessDto } from './dto/update-process.dto';

@Injectable()
export class ProcessService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProcessDto) {
    const data: any = {
      process_id: dto.process_id,
      building_id: dto.building_id ?? undefined,
      name: dto.name ?? undefined,
      description: dto.description ?? undefined,
      duration: dto.duration ?? undefined,
    };
    return this.prisma.process.create({ data });
  }

  async findAll() {
    return this.prisma.process.findMany();
  }

  async findOne(process_id: number) {
    const process = await this.prisma.process.findUnique({ where: { process_id } });
    if (!process) throw new NotFoundException(`Process ${process_id} not found`);
    return process;
  }

  async findAllWithRelations() {
    return this.prisma.process.findMany({
      include: {
        building: true,
        process_task: {
          include: {
            task: {
              include: {
                task_skill: { include: { skill: true } },
              },
            },
          },
        },
      },
    });
  }

  async findOneWithRelations(process_id: number) {
    const process = await this.prisma.process.findUnique({
      where: { process_id },
      include: {
        building: true,
        process_task: {
          include: {
            task: {
              include: {
                task_skill: { include: { skill: true } },
              },
            },
          },
        },
      },
    });
    if (!process) throw new NotFoundException(`Process ${process_id} not found`);
    return process;
  }

  async update(process_id: number, dto: UpdateProcessDto) {
    const data: any = {
      building_id: dto.building_id ?? undefined,
      name: dto.name ?? undefined,
      description: dto.description ?? undefined,
      duration: dto.duration ?? undefined,
    };
    return this.prisma.process.update({ where: { process_id }, data });
  }

  async remove(process_id: number) {
    return this.prisma.process.delete({ where: { process_id } });
  }

  // Connect/Disconnect methods for tasks
  async connectTask(process_id: number, task_id: number, order?: number) {
    // Check if process exists
    await this.findOne(process_id);
    
    return this.prisma.process_task.create({
      data: { 
        process_id, 
        task_id,
        order: order ?? undefined,
      },
      include: { task: true },
    });
  }

  async disconnectTask(process_id: number, task_id: number) {
    // Check if process exists
    await this.findOne(process_id);
    
    return this.prisma.process_task.delete({
      where: { process_id_task_id: { process_id, task_id } },
    });
  }
}
