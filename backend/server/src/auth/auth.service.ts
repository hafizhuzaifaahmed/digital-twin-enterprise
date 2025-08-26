import { Injectable, NotFoundException, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUserByEmail(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: { emai: email },
      include: { role: true },
    });
    if (!user) throw new NotFoundException('Invalid credentials');

    if (!user.password) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUserByEmail(email, password);

    const payload = {
      sub: user.user_id,
      email: user.emai,
      role: user.role?.name ?? 'USER',
      username: user.name,
    };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token, user: { user_id: user.user_id, email: user.emai, role: payload.role, username: user.name } };
  }

  async register(requestorUserId: number, dto: { username: string; email: string; password: string; role_id: number }) {
    // Ensure requestor is SUPER_ADMIN
    const requestor = await this.prisma.user.findUnique({ where: { user_id: requestorUserId }, include: { role: true } });
    if (!requestor || requestor.role?.name !== 'SUPER_ADMIN') {
      throw new ForbiddenException('Only SUPER_ADMIN can register users');
    }

    const hashed = await bcrypt.hash(dto.password, 10);
    const agg = await this.prisma.user.aggregate({ _max: { user_id: true } });
    const nextUserId = (agg._max.user_id ?? 0) + 1;
    const created = await this.prisma.user.create({
      data: {
        user_id: nextUserId,
        name: dto.username,
        emai: dto.email,
        password: hashed,
        role_id: dto.role_id ?? undefined,
      },
      include: { role: true },
    });

    return { user_id: created.user_id, email: created.emai, username: created.name, role: created.role?.name };
  }
}
