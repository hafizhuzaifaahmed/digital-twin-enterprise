import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(private readonly prisma: PrismaService) {}

  async seedSuperAdmin() {
    // Ensure SUPER_ADMIN role exists
    let role = await this.prisma.role.findFirst({ where: { name: 'SUPER_ADMIN' } });
    if (!role) {
      const agg = await this.prisma.role.aggregate({ _max: { role_id: true } });
      const nextRoleId = (agg._max.role_id ?? 0) + 1;
      role = await this.prisma.role.create({ data: { role_id: nextRoleId, name: 'SUPER_ADMIN', description: 'System Super Admin' } });
      this.logger.log('Created SUPER_ADMIN role');
    }

    const email = process.env.SUPER_ADMIN_EMAIL || 'superadmin@example.com';
    const username = process.env.SUPER_ADMIN_USERNAME || 'superadmin';
    const password = process.env.SUPER_ADMIN_PASSWORD || 'ChangeMe123!';

    const existing = await this.prisma.user.findFirst({ where: { emai: email } });
    if (!existing) {
      const hashed = await bcrypt.hash(password, 10);
      const aggU = await this.prisma.user.aggregate({ _max: { user_id: true } });
      const nextUserId = (aggU._max.user_id ?? 0) + 1;
      await this.prisma.user.create({ data: { user_id: nextUserId, name: username, emai: email, password: hashed, role_id: role.role_id } });
      this.logger.log(`Seeded SUPER_ADMIN user (${email}).`);
    }
  }
}
