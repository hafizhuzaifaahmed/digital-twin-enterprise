import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateJobDto) {
    const data: any = {
      job_id: dto.job_id,
      function_id: dto.function_id ?? undefined,
      name: dto.name ?? undefined,
      levelid: dto.levelid ?? undefined,
    };
    return this.prisma.job.create({ data });
  }

  async findAll() {
    return this.prisma.job.findMany();
  }

  async findOne(job_id: number) {
    const job = await this.prisma.job.findUnique({ where: { job_id } });
    if (!job) throw new NotFoundException(`Job ${job_id} not found`);
    return job;
  }

  async findAllWithRelations() {
    return this.prisma.job.findMany({
      include: {
        Renamedfunction: true,
        job_level: true,
        people: true,
        job_skill: { include: { skill: true } },
        job_task: { 
          include: { 
            task: { 
              include: { 
                task_skill: { include: { skill: true } } 
              } 
            } 
          } 
        },
      },
    });
  }

  async findOneWithRelations(job_id: number) {
    const job = await this.prisma.job.findUnique({
      where: { job_id },
      include: {
        Renamedfunction: true,
        job_level: true,
        people: true,
        job_skill: { include: { skill: true } },
        job_task: { 
          include: { 
            task: { 
              include: { 
                task_skill: { include: { skill: true } } 
              } 
            } 
          } 
        },
      },
    });
    if (!job) throw new NotFoundException(`Job ${job_id} not found`);
    return job;
  }

  async update(job_id: number, dto: UpdateJobDto) {
    const data: any = {
      function_id: dto.function_id ?? undefined,
      name: dto.name ?? undefined,
      levelid: dto.levelid ?? undefined,
    };
    return this.prisma.job.update({ where: { job_id }, data });
  }

  async remove(job_id: number) {
    return this.prisma.job.delete({ where: { job_id } });
  }

  // Connect/Disconnect methods for skills
  async connectSkill(job_id: number, skillid: number) {
    // Check if job exists
    await this.findOne(job_id);
    
    return this.prisma.job_skill.create({
      data: { jobid: job_id, skillid },
      include: { skill: true },
    });
  }

  async disconnectSkill(job_id: number, skillid: number) {
    // Check if job exists
    await this.findOne(job_id);
    
    return this.prisma.job_skill.delete({
      where: { jobid_skillid: { jobid: job_id, skillid } },
    });
  }

  // Connect/Disconnect methods for tasks
  async connectTask(job_id: number, task_id: number) {
    // Check if job exists
    await this.findOne(job_id);
    
    return this.prisma.job_task.create({
      data: { job_id, task_id },
      include: { task: true },
    });
  }

  async disconnectTask(job_id: number, task_id: number) {
    // Check if job exists
    await this.findOne(job_id);
    
    return this.prisma.job_task.delete({
      where: { job_id_task_id: { job_id, task_id } },
    });
  }
}
