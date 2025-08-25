import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ProcessService } from './process.service';
import { CreateProcessDto } from './dto/create-process.dto';
import { UpdateProcessDto } from './dto/update-process.dto';

@Controller('process')
export class ProcessController {
  constructor(private readonly processService: ProcessService) {}

  @Post()
  create(@Body() dto: CreateProcessDto) {
    return this.processService.create(dto);
  }

  @Get()
  findAll() {
    return this.processService.findAll();
  }

  @Get('with-relations')
  findAllWithRelations() {
    return this.processService.findAllWithRelations();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.processService.findOne(id);
  }

  @Get(':id/with-relations')
  findOneWithRelations(@Param('id', ParseIntPipe) id: number) {
    return this.processService.findOneWithRelations(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProcessDto) {
    return this.processService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.processService.remove(id);
  }

  // Connect/Disconnect endpoints for tasks
  @Post(':id/tasks')
  connectTask(
    @Param('id', ParseIntPipe) id: number,
    @Body('task_id', ParseIntPipe) task_id: number,
    @Body('order') order?: number,
  ) {
    return this.processService.connectTask(id, task_id, order);
  }

  @Delete(':id/tasks/:taskid')
  disconnectTask(
    @Param('id', ParseIntPipe) id: number,
    @Param('taskid', ParseIntPipe) taskid: number,
  ) {
    return this.processService.disconnectTask(id, taskid);
  }
}
