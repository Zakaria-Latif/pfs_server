
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AddPlayerToMatchInput, CreateMatchInput, FilterMatchInput, PaginationInput } from './match.input';
import { Match } from '@prisma/client';

@Injectable()
export class MatchService {
   constructor(private prisma: PrismaService) {}
 
   async getAllMatches(paginationInput: PaginationInput): Promise<Match[]> {
       return this.prisma.match.findMany({skip: paginationInput.skip, take: paginationInput.take});
   }

   async createMatch(createMatchInput: CreateMatchInput): Promise<Match>{
    return this.prisma.match.create({
        data: {
            name: createMatchInput.name,
            location: createMatchInput.location,
            time: createMatchInput.time,
            playersNumber: createMatchInput.playersNumber,
            prize: createMatchInput.prize,
            duration: createMatchInput.duration,
            creator: {
              connect: { id: createMatchInput.creatorId },
            },
            // Include any other optional fields here
          },
    })
   }

    async searchMatches(filterMatchInput: FilterMatchInput): Promise<Match[]>{
      return this.prisma.match.findMany({where: {
        duration: {
          gte: filterMatchInput.minDuration,
          lte: filterMatchInput.maxDuration,
        },
        time: {
          gte: filterMatchInput.from.toISOString(),
          lte: filterMatchInput.to.toISOString()
        }
      }});
    }

    async addPlayerToMatch(addPlayerToMatchInput: AddPlayerToMatchInput): Promise<Match>{
      return null
    }
}