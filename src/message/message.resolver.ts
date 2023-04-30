import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
  Subscription,
  ID,
} from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './entities/message.entity';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { PaginationGroupInput } from 'src/group/dto/pagination-group.input';
import { Player } from 'src/player/entities/player.entity';
import { Group } from 'src/group/entities/group.entity';
import { PubSub } from 'graphql-subscriptions';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/JwtAuthGuard';

@Resolver(() => Message)
export class MessageResolver {
  private pubSub: PubSub;
  constructor(private readonly messageService: MessageService) {
    this.pubSub = new PubSub();
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Message)
  async createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
  ): Promise<Message> {
    const message = await this.messageService.create(createMessageInput);
    this.pubSub.publish('messageCreated', { messageCreated: message });
    return message;
  }

  @UseGuards(JwtAuthGuard)
  @Subscription((returns) => Message)
  messageCreated() {
    return this.pubSub.asyncIterator('messageCreated');
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Message], { name: 'message' })
  async findAll(
    @Args('paginationInput') paginationInput: PaginationGroupInput,
  ): Promise<Message[]> {
    return this.messageService.findAll(paginationInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Message, { name: 'message' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<Message> {
    return this.messageService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Message)
  async updateMessage(
    @Args('updateMessageInput') updateMessageInput: UpdateMessageInput,
  ): Promise<Message> {
    const message = await this.messageService.update(updateMessageInput);
    this.pubSub.publish('messageUpdated', { messageUpdated: message });
    return message;
  }

  @UseGuards(JwtAuthGuard)
  @Subscription((returns) => Message)
  messageUpdated() {
    return this.pubSub.asyncIterator('messageUpdated');
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Message)
  async removeMessage(@Args('id', { type: () => ID }) id: Message['id']) {
    const message = await this.messageService.remove(id);
    this.pubSub.publish('messageDeleted', { messageDeleted: message });
    return message;
  }

  @UseGuards(JwtAuthGuard)
  @Subscription((returns) => Message, {
    nullable: true,
  })
  messageremoved() {
    return this.pubSub.asyncIterator('messageDeleted');
  }

  @ResolveField((returns) => Player)
  async sender(@Parent() message: Message): Promise<Player> {
    return this.messageService.getSender(message.senderId);
  }

  @ResolveField((returns) => Group)
  async group(@Parent() message: Message): Promise<Group> {
    return this.messageService.getGroup(message.groupId);
  }
}
