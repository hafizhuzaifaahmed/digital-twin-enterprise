import { Module } from '@nestjs/common';
import { RenamedfunctionService } from './renamedfunction.service';
import { RenamedfunctionController } from './renamedfunction.controller';

@Module({
  controllers: [RenamedfunctionController],
  providers: [RenamedfunctionService],
  exports: [RenamedfunctionService],
})
export class RenamedfunctionModule {}
