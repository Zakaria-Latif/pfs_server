import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { GroupService } from './group.service';
import { Group } from './entities/group.entity';
import { CreateGroupInput } from './dto/create-group.input';
import { UpdateGroupInput } from './dto/update-group.input';
import { PaginationGroupInput } from './dto/pagination-group.input';
import { GroupToPlayer } from 'src/group-to-player/entities/group-to-player.entity';
import { Message } from 'src/message/entities/message.entity';

@Resolver(() => Group)
export class GroupResolver {
  constructor(private readonly groupService: GroupService) {}

  @Mutation(() => Group)
  async createGroup(
    @Args('createGroupInput') createGroupInput: CreateGroupInput,
  ): Promise<Group> {
    return this.groupService.create(createGroupInput);
  }

  @Query(() => [Group], { name: 'group' })
  async findAll(
    @Args('paginationInput') paginationInput: PaginationGroupInput,
  ): Promise<Group[]> {
    return this.groupService.findAll(paginationInput);
  }

  @Query(() => Group, { name: 'group' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<Group> {
    return this.groupService.findOne(id);
  }

  @Mutation(() => Group)
  async updateGroup(
    @Args('updateGroupInput') updateGroupInput: UpdateGroupInput,
  ): Promise<Group> {
    return this.groupService.update(updateGroupInput);
  }

  @Mutation(() => Group)
  async removeGroup(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Group> {
    return this.groupService.remove(id);
  }

  @ResolveField((returns) => [GroupToPlayer])
  async players(@Parent() group: Group): Promise<GroupToPlayer[]> {
    return this.groupService.getPlayers(group.id);
  }
  @ResolveField((returns) => [Message])
  async messages(@Parent() group: Group): Promise<Message[]> {
    return this.groupService.getMessages(group.id);
  }
}
