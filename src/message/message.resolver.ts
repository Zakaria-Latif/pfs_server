import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './entities/message.entity';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { PaginationGroupInput } from 'src/group/dto/pagination-group.input';
import { Player } from 'src/player/entities/player.entity';
import { Group } from 'src/group/entities/group.entity';

@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Mutation(() => Message)
  async createMessage(@Args('createMessageInput') createMessageInput: CreateMessageInput) : Promise<Message>{
    return this.messageService.create(createMessageInput);
  }

  @Query(() => [Message], { name: 'message' })
  async findAll(@Args("paginationInput") paginationInput: PaginationGroupInput):  Promise<Message[]> {
    return this.messageService.findAll(paginationInput);
  }

  @Query(() => Message, { name: 'message' })
  async findOne(@Args('id', { type: () => Int }) id: number):  Promise<Message> {
    return this.messageService.findOne(id);
  }

  @Mutation(() => Message)
  async updateMessage(@Args('updateMessageInput') updateMessageInput: UpdateMessageInput):  Promise<Message> {
    return this.messageService.update(updateMessageInput.id, updateMessageInput);
  }

  @Mutation(() => Message)
  async removeMessage(@Args('id', { type: () => Int }) id: number):  Promise<Message> {
    return this.messageService.remove(id);
  }

  @ResolveField(returns=>Player)
  async sender(@Parent() message: Message): Promise<Player>{
    return this.messageService.getSender(message.senderId);
  }
  
  @ResolveField(returns=>Group)
  async group(@Parent() message:Message): Promise<Group>{
    return this.messageService.getGroup(message.groupId);
  }
}
