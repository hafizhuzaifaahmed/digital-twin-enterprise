import { Injectable } from '@nestjs/common';
import { OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    // Use a loose cast so this compiles even before `prisma generate` runs
    (this as any).$on('beforeExit', async () => {
      await app.close();
    });
  }
}
