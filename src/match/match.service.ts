
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { MatchInputCreate, MatchInputEdit } from './match.input';
import { Match } from './match.entity';

@Injectable()
export class MatchService {
   constructor(private prisma: PrismaService) {}
 
   async getAllMatches(): Promise<Match[]> {
       return this.prisma.match.findMany();
   }
}