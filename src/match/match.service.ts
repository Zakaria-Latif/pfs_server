import { MatchInputCreate, MatchInputEdit } from './match.input';
import { Match } from './match.entity';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MatchService {
  constructor(private prisma: PrismaService) {}

  async getAllMatches(): Promise<Match[]> {
    return this.prisma.match.findMany();
  }

  async findAllMatchesWithCreators() {
    return this.prisma.match.findMany({ include: { creator: true } });
  }
}
