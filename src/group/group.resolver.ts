import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';
import { GroupService } from './group.service';
import { Group } from './entities/group.entity';
import { CreateGroupInput } from './dto/create-group.input';
import { UpdateGroupInput } from './dto/update-group.input';
import { PaginationGroupInput } from './dto/pagination-group.input';
import { GroupToPlayer } from 'src/group-to-player/entities/group-to-player.entity';
import { Message } from 'src/message/entities/message.entity';
import { JwtAuthGuard } from 'src/auth/guards/JwtAuthGuard';
import { UseGuards } from '@nestjs/common';
import { OwnershipGuard } from './guards/OwnershipGuard';
import { Player } from 'src/player/entities/player.entity';

@Resolver(() => Group)
export class GroupResolver {
  constructor(private readonly groupService: GroupService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Group, { name: "createGroup" })
  async createGroup(
    @Args('createGroupInput') createGroupInput: CreateGroupInput,
  ): Promise<Group> {
    return this.groupService.create(createGroupInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Group], { name: 'groups' })
  async findAll(
    @Args('paginationInput') paginationInput: PaginationGroupInput, @Context() context: any
  ): Promise<Group[]> {
    return this.groupService.findAll(paginationInput, context.req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Group, { name: 'group' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<Group> {
    return this.groupService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @Mutation(() => Group, { name: "updateGroup" })
  async updateGroup(
    @Args('updateGroupInput') updateGroupInput: UpdateGroupInput,
  ): Promise<Group> {
    return this.groupService.update(updateGroupInput);
  }

  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @Mutation(() => Group, { name: "removeGroup" })
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

  @ResolveField((returns) => Player)
  async creator(@Parent() group: Group): Promise<Player> {
    return this.groupService.getCreator(group.creatorId);
  }
}
