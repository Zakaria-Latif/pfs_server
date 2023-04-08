import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
    constructor(private prisma: PrismaService) {}
 
   async getAllMessages(): Promise<Message[]> {
       return this.prisma.message.findMany();
   }
}
