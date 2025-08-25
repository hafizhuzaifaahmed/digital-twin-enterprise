import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTaskDto) {
    const data: any = {
      task_id: dto.task_id,
      name: dto.name ?? undefined,
      description: dto.description ?? undefined,
      duration: dto.duration ?? undefined,
      minlevel: dto.minlevel ?? undefined,
    };
    return this.prisma.task.create({ data });
  }

  async findAll() {
    return this.prisma.task.findMany();
  }

  async findOne(task_id: number) {
    const task = await this.prisma.task.findUnique({ where: { task_id } });
    if (!task) throw new NotFoundException(`Task ${task_id} not found`);
    return task;
  }

  async findAllWithRelations() {
    return this.prisma.task.findMany({
      include: {
        task_skill: { include: { skill: true } },
        job_task: { 
          include: { 
            job: { 
              include: { 
                job_level: true, 
                Renamedfunction: true 
              } 
            } 
          } 
        },
        process_task: { include: { process: true } },
      },
    });
  }

  async findOneWithRelations(task_id: number) {
    const task = await this.prisma.task.findUnique({
      where: { task_id },
      include: {
        task_skill: { include: { skill: true } },
        job_task: { 
          include: { 
            job: { 
              include: { 
                job_level: true, 
                Renamedfunction: true 
              } 
            } 
          } 
        },
        process_task: { include: { process: true } },
      },
    });
    if (!task) throw new NotFoundException(`Task ${task_id} not found`);
    return task;
  }

  async update(task_id: number, dto: UpdateTaskDto) {
    const data: any = {
      name: dto.name ?? undefined,
      description: dto.description ?? undefined,
      duration: dto.duration ?? undefined,
      minlevel: dto.minlevel ?? undefined,
    };
    try {
      return await this.prisma.task.update({ where: { task_id }, data });
    } catch (e: any) {
      if (e?.code === 'P2025') throw new NotFoundException(`Task ${task_id} not found`);
      throw e;
    }
  }

  async remove(task_id: number) {
    try {
      return await this.prisma.task.delete({ where: { task_id } });
    } catch (e: any) {
      if (e?.code === 'P2025') throw new NotFoundException(`Task ${task_id} not found`);
      throw e;
    }
  }

  // Connect/Disconnect methods for skills
  async connectSkill(task_id: number, skillid: number) {
    // Check if task exists
    await this.findOne(task_id);
    
    return this.prisma.task_skill.create({
      data: { taskid: task_id, skillid },
      include: { skill: true },
    });
  }

  async disconnectSkill(task_id: number, skillid: number) {
    // Check if task exists
    await this.findOne(task_id);
    
    return this.prisma.task_skill.delete({
      where: { taskid_skillid: { taskid: task_id, skillid } },
    });
  }

  // Connect/Disconnect methods for jobs
  async connectJob(task_id: number, job_id: number) {
    // Check if task exists
    await this.findOne(task_id);
    
    return this.prisma.job_task.create({
      data: { task_id, job_id },
      include: { job: true },
    });
  }

  async disconnectJob(task_id: number, job_id: number) {
    // Check if task exists
    await this.findOne(task_id);
    
    return this.prisma.job_task.delete({
      where: { job_id_task_id: { job_id, task_id } },
    });
  }
}
