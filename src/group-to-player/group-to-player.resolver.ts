import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { GroupToPlayerService } from './group-to-player.service';
import { GroupToPlayer } from './entities/group-to-player.entity';
import { CreateGroupToPlayerInput } from './dto/create-group-to-player.input';
import { UpdateGroupToPlayerInput } from './dto/update-group-to-player.input';
import { PaginationGroupInput } from 'src/group/dto/pagination-group.input';
import { Player } from 'src/player/entities/player.entity';
import { Group } from 'src/group/entities/group.entity';

@Resolver(() => GroupToPlayer)
export class GroupToPlayerResolver {
  constructor(private readonly groupToPlayerService: GroupToPlayerService) {}

  @Mutation(() => GroupToPlayer)
  async createGroupToPlayer(@Args('createGroupToPlayerInput') createGroupToPlayerInput: CreateGroupToPlayerInput): Promise<GroupToPlayer> {
    return this.groupToPlayerService.create(createGroupToPlayerInput);
  }

  @Query(() => [GroupToPlayer], { name: 'groupToPlayer' })
  async findAll(@Args("paginationInput") paginationInput: PaginationGroupInput):  Promise<GroupToPlayer[]> {
    return this.groupToPlayerService.findAll(paginationInput);
  }

  @Query(() => GroupToPlayer, { name: 'groupToPlayer' })
  async findOne(@Args('id', { type: () => Int }) id: number):  Promise<GroupToPlayer> {
    return this.groupToPlayerService.findOne(id);
  }

  @Mutation(() => GroupToPlayer)
  async updateGroupToPlayer(@Args('updateGroupToPlayerInput') updateGroupToPlayerInput: UpdateGroupToPlayerInput):  Promise<GroupToPlayer> {
    return this.groupToPlayerService.update(updateGroupToPlayerInput.id, updateGroupToPlayerInput);
  }

  @Mutation(() => GroupToPlayer)
  async removeGroupToPlayer(@Args('id', { type: () => Int }) id: number):  Promise<GroupToPlayer> {
    return this.groupToPlayerService.remove(id);
  }

  @ResolveField(returns=>Player)
  async player(@Parent() groupToPlayer: GroupToPlayer): Promise<Player>{
    return this.groupToPlayerService.getPlayer(groupToPlayer.playerId);
  }
  
  @ResolveField(returns=>Group)
  async group(@Parent() groupToPlayer: GroupToPlayer): Promise<Group>{
    return this.groupToPlayerService.getGroup(groupToPlayer.groupId);
  }
}
