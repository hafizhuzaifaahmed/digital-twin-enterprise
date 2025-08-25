import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePeopleDto } from './dto/create-people.dto';
import { UpdatePeopleDto } from './dto/update-people.dto';

@Injectable()
export class PeopleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePeopleDto) {
    const data: any = {
      peopleid: dto.peopleid,
      name: dto.name ?? undefined,
      email: dto.email ?? undefined,
      phone: dto.phone ?? undefined,
      companyid: dto.companyid ?? undefined,
      jobid: dto.jobid ?? undefined,
    };
    return this.prisma.people.create({ data });
  }

  async findAll() {
    return this.prisma.people.findMany();
  }

  async findOne(peopleid: number) {
    const people = await this.prisma.people.findUnique({ where: { peopleid } });
    if (!people) throw new NotFoundException(`People ${peopleid} not found`);
    return people;
  }

  async findAllWithRelations() {
    return this.prisma.people.findMany({
      include: {
        company: true,
        job: {
          include: {
            job_level: true,
            Renamedfunction: true,
          },
        },
      },
    });
  }

  async findOneWithRelations(peopleid: number) {
    const people = await this.prisma.people.findUnique({
      where: { peopleid },
      include: {
        company: true,
        job: {
          include: {
            job_level: true,
            Renamedfunction: true,
          },
        },
      },
    });
    if (!people) throw new NotFoundException(`People ${peopleid} not found`);
    return people;
  }

  async update(peopleid: number, dto: UpdatePeopleDto) {
    const data: any = {
      name: dto.name ?? undefined,
      email: dto.email ?? undefined,
      phone: dto.phone ?? undefined,
      companyid: dto.companyid ?? undefined,
      jobid: dto.jobid ?? undefined,
    };
    return this.prisma.people.update({ where: { peopleid }, data });
  }

  async remove(peopleid: number) {
    return this.prisma.people.delete({ where: { peopleid } });
  }
}
