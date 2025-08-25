import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.taskService.create(dto);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get('with-relations')
  findAllWithRelations() {
    return this.taskService.findAllWithRelations();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.findOne(id);
  }

  @Get(':id/with-relations')
  findOneWithRelations(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.findOneWithRelations(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTaskDto) {
    return this.taskService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.remove(id);
  }

  // Connect/Disconnect endpoints for skills
  @Post(':id/skills')
  connectSkill(
    @Param('id', ParseIntPipe) id: number,
    @Body('skillid', ParseIntPipe) skillid: number,
  ) {
    return this.taskService.connectSkill(id, skillid);
  }

  @Delete(':id/skills/:skillid')
  disconnectSkill(
    @Param('id', ParseIntPipe) id: number,
    @Param('skillid', ParseIntPipe) skillid: number,
  ) {
    return this.taskService.disconnectSkill(id, skillid);
  }

  // Connect/Disconnect endpoints for jobs
  @Post(':id/jobs')
  connectJob(
    @Param('id', ParseIntPipe) id: number,
    @Body('job_id', ParseIntPipe) job_id: number,
  ) {
    return this.taskService.connectJob(id, job_id);
  }

  @Delete(':id/jobs/:jobid')
  disconnectJob(
    @Param('id', ParseIntPipe) id: number,
    @Param('jobid', ParseIntPipe) jobid: number,
  ) {
    return this.taskService.disconnectJob(id, jobid);
  }
}
