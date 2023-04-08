import { Query, Resolver } from '@nestjs/graphql';
import { Message } from './message.entity';
import { MessageService } from './message.service';

@Resolver(()=>Message)
export class MessageResolver {
    constructor(
        private matchService: MessageService,
        // private movieCommentService: MovieCommentService,
      ) {}
    
      @Query(() => [Message])
      async getAllMessages(): Promise<Message[]> {
        return this.matchService.getAllMessages();
      }
    
}
