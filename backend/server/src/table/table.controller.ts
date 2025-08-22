import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';

@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post()
  create(@Body() dto: CreateTableDto) {
    return this.tableService.create(dto);
  }

  @Get()
  findAll() {
    return this.tableService.findAll();
  }

  @Get('with-relations')
  findAllWithRelations() {
    return this.tableService.findAllWithRelations();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tableService.findOne(id);
  }

  @Get(':id/with-relations')
  findOneWithRelations(@Param('id', ParseIntPipe) id: number) {
    return this.tableService.findOneWithRelations(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTableDto) {
    return this.tableService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tableService.remove(id);
  }
}
