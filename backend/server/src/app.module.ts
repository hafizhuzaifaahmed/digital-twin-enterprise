import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CompanyModule } from './company/company.module';
import { BuildingModule } from './building/building.module';
import { FloorModule } from './floor/floor.module';
import { RoomModule } from './room/room.module';
import { TableModule } from './table/table.module';
import { RenamedfunctionModule } from './renamedfunction/renamedfunction.module';
import { JobModule } from './job/job.module';
import { ProcessModule } from './process/process.module';

@Module({
  imports: [PrismaModule, CompanyModule, BuildingModule, FloorModule, RoomModule, TableModule, RenamedfunctionModule, JobModule, ProcessModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
