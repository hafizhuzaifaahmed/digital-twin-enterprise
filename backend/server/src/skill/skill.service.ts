import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Injectable()
export class SkillService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSkillDto) {
    const data: any = {
      skillid: dto.skill_id,
      name: dto.name ?? undefined,
      description: dto.description ?? undefined,
      level: dto.level ?? undefined,
    };
    return this.prisma.skill.create({ data });
  }

  async findAll() {
    return this.prisma.skill.findMany();
  }

  async findOne(skill_id: number) {
    const skill = await this.prisma.skill.findUnique({ where: { skillid: skill_id } });
    if (!skill) throw new NotFoundException(`Skill ${skill_id} not found`);
    return skill;
  }

  async findAllWithRelations() {
    return this.prisma.skill.findMany({
      include: {
        job_skill: { include: { job: true } },
        task_skill: { include: { task: true } },
      },
    });
  }

  async findOneWithRelations(skill_id: number) {
    const skill = await this.prisma.skill.findUnique({
      where: { skillid: skill_id },
      include: {
        job_skill: { include: { job: true } },
        task_skill: { include: { task: true } },
      },
    });
    if (!skill) throw new NotFoundException(`Skill ${skill_id} not found`);
    return skill;
  }

  async update(skill_id: number, dto: UpdateSkillDto) {
    const data: any = {
      name: dto.name ?? undefined,
      description: dto.description ?? undefined,
      level: dto.level ?? undefined,
    };
    try {
      return await this.prisma.skill.update({ where: { skillid: skill_id }, data });
    } catch (e: any) {
      if (e?.code === 'P2025') throw new NotFoundException(`Skill ${skill_id} not found`);
      throw e;
    }
  }

  async remove(skill_id: number) {
    try {
      return await this.prisma.skill.delete({ where: { skillid: skill_id } });
    } catch (e: any) {
      if (e?.code === 'P2025') throw new NotFoundException(`Skill ${skill_id} not found`);
      throw e;
    }
  }
}
