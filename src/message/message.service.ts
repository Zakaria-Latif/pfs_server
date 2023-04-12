import { Injectable } from '@nestjs/common';
import { Message } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MessageService {
    constructor(private prisma: PrismaService) {}
 
   async getAllMessages(): Promise<Message[]> {
    return this.prisma.message.findMany();
   }
}
