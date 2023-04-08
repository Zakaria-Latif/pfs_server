import { Module } from '@nestjs/common';
import { MessageResolver } from './message.resolver';
import { MessageService } from './message.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [MessageResolver, MessageService, PrismaService]
})
export class MessageModule {}
