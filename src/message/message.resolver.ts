import { Query, Resolver } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from '@prisma/client';
import { Message as MessageM } from './message.entity';

@Resolver(()=>MessageM)
export class MessageResolver {
    constructor(
        private messageService: MessageService,
        // private movieCommentService: MovieCommentService,
      ) {}
    
      @Query(() => [MessageM])
      async getAllMessages(): Promise<Message[]> {
        return this.messageService.getAllMessages();
      }
    
}
