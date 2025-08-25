import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { RenamedfunctionService } from './renamedfunction.service';
import { CreateRenamedfunctionDto } from './dto/create-renamedfunction.dto';
import { UpdateRenamedfunctionDto } from './dto/update-renamedfunction.dto';

@Controller('renamedfunction')
export class RenamedfunctionController {
  constructor(private readonly renamedfunctionService: RenamedfunctionService) {}

  @Post()
  create(@Body() dto: CreateRenamedfunctionDto) {
    return this.renamedfunctionService.create(dto);
  }

  @Get()
  findAll() {
    return this.renamedfunctionService.findAll();
  }

  @Get('with-relations')
  findAllWithRelations() {
    return this.renamedfunctionService.findAllWithRelations();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.renamedfunctionService.findOne(id);
  }

  @Get(':id/with-relations')
  findOneWithRelations(@Param('id', ParseIntPipe) id: number) {
    return this.renamedfunctionService.findOneWithRelations(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateRenamedfunctionDto) {
    return this.renamedfunctionService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.renamedfunctionService.remove(id);
  }
}
