import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CompanyModule } from './company/company.module';
import { BuildingModule } from './building/building.module';
import { FloorModule } from './floor/floor.module';

@Module({
  imports: [PrismaModule, CompanyModule, BuildingModule, FloorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
