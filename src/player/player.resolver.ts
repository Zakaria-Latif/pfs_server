import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { PlayerService } from './player.service';
import { Player } from './entities/player.entity';
import { CreatePlayerInput } from './dto/create-player.input';
import { UpdatePlayerInput } from './dto/update-player.input';
import { PaginationGroupInput } from 'src/group/dto/pagination-group.input';
import { PlayerStatistics } from 'src/player-statistics/entities/player-statistic.entity';
import { GroupToPlayer } from 'src/group-to-player/entities/group-to-player.entity';
import { Match } from 'src/match/entities/match.entity';
import { MatchService } from 'src/match/match.service';
import { MatchToPlayer } from 'src/match-to-player/entities/match-to-player.entity';
import { Message } from 'src/message/entities/message.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/JwtAuthGuard';

@Resolver(() => Player)
export class PlayerResolver {
  constructor(private readonly playerService: PlayerService
    ) {}

  // @Mutation(() => Player)
  // async createPlayer(@Args('createPlayerInput') createPlayerInput: CreatePlayerInput):  Promise<Player> {
  //   return this.playerService.create(createPlayerInput);
  // }

  @Query(() => [Player], { name: 'players' })
  @UseGuards(JwtAuthGuard)
  async findAll(@Args("paginationInput") paginationInput: PaginationGroupInput): Promise<Player[]> {
    return this.playerService.findAll(paginationInput);
  }

  @Query(() => Player, { name: 'player' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<Player> {
    return this.playerService.findOne(id);
  }

  @Mutation(() => Player)
  async updatePlayer(@Args('updatePlayerInput') updatePlayerInput: UpdatePlayerInput): Promise<Player>{
    return this.playerService.update(updatePlayerInput.id, updatePlayerInput);
  }

  @Mutation(() => Player)
  async removePlayer(@Args('id', { type: () => Int }) id: number): Promise<Player> {
    return this.playerService.remove(id);
  }

  @ResolveField(returns=>PlayerStatistics)
  async playerStatistics(@Parent() player: Player): Promise<PlayerStatistics>{
    return this.playerService.getPlayerStatistics(player.playerStatisticsId);
  }

  @ResolveField(returns=>[GroupToPlayer])
  async groups(@Parent() player: Player): Promise<GroupToPlayer[]>{
    return this.playerService.getGroupToPlayer(player.id);
  }

  @ResolveField(returns=>[Match])
  async createdMatches(@Parent() player: Player): Promise<Match[]>{
    return this.playerService.getCreatedMatches(player.id);
  }

  @ResolveField(returns=>[MatchToPlayer])
  async matchToPlayers(@Parent() player: Player): Promise<MatchToPlayer[]>{
    return this.playerService.getMatchToPlayers(player.id);
  }

  @ResolveField(returns=>[Message])
  async messages(@Parent() player: Player): Promise<Message[]>{
    return this.playerService.getMessages(player.id);
  }
}
