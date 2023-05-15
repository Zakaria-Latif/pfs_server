import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
  Context,
} from '@nestjs/graphql';
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
import { ExecutionContext, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/JwtAuthGuard';
import { OwnershipGuard } from './guards/OwnershipGuard';
import { Request } from 'src/request/entities/request.entity';
import { Invitation } from 'src/invitation/entities/invitation.entity';
import { Calendar } from 'src/calendar/entities/calendar.entity';
import { SearchPlayerInput } from './dto/search-player.input';

@Resolver(() => Player)
export class PlayerResolver {
  constructor(private readonly playerService: PlayerService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Player)
  async createPlayer(
    @Args('createPlayerInput') createPlayerInput: CreatePlayerInput,
  ): Promise<Player> {
    return this.playerService.create(createPlayerInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Player], { name: 'players' })
  async findAll(
    @Args('paginationInput') paginationInput: PaginationGroupInput,
    @Context() context: any,
  ): Promise<Player[]> {
    console.log({id: context.req.user.id});
    return this.playerService.findAll(paginationInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Player], { name: 'searchPlayers' })
  async searchPlayers(
    @Args('searchPlayerInput') searchPlayerInput: SearchPlayerInput,
  ): Promise<Player[]> {
    console.log(searchPlayerInput);
    return this.playerService.search(searchPlayerInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Player, { name: 'player' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<Player> {
    return this.playerService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @Mutation(() => Player, { name: 'updatePlayer' })
  async updatePlayer(
    @Args('updatePlayerInput') updatePlayerInput: UpdatePlayerInput,
  ): Promise<Player> {
    return this.playerService.update(updatePlayerInput);
  }

  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @Mutation(() => Player, { name: 'removePlayer' })
  async removePlayer(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Player> {
    return this.playerService.remove(id);
  }

  @ResolveField((returns) => PlayerStatistics)
  async playerStatistics(@Parent() player: Player): Promise<PlayerStatistics> {
    return this.playerService.getPlayerStatistics(player.playerStatisticsId);
  }

  @ResolveField((returns) => [GroupToPlayer])
  async groups(@Parent() player: Player): Promise<GroupToPlayer[]> {
    return this.playerService.getGroupToPlayer(player.id);
  }

  @ResolveField((returns) => [Match])
  async createdMatches(@Parent() player: Player): Promise<Match[]> {
    return this.playerService.getCreatedMatches(player.id);
  }

  @ResolveField((returns) => [MatchToPlayer])
  async matchToPlayers(@Parent() player: Player): Promise<MatchToPlayer[]> {
    return this.playerService.getMatchToPlayers(player.id);
  }

  @ResolveField((returns) => [GroupToPlayer])
  async groupToPlayers(@Parent() player: Player): Promise<GroupToPlayer[]> {
    return this.playerService.getGroupToPlayer(player.id);
  }

  @ResolveField((returns) => [Message])
  async messages(@Parent() player: Player): Promise<Message[]> {
    return this.playerService.getMessages(player.id);
  }

  @ResolveField((returns) => [Request])
  async getPlayerRequests(@Parent() player: Player): Promise<Request[]> {
    return this.playerService.getPlayerRequests(player.id);
  }

  @ResolveField((returns) => [Invitation])
  async getPlayerInvitations(@Parent() player: Player): Promise<Invitation[]> {
    return this.playerService.getPlayerInvitations(player.id);
  }

  @ResolveField((returns) => [Calendar])
  async getPlayerCalendar(@Parent() player: Player): Promise<Calendar> {
    return this.playerService.getPlayerCalendar(player.id);
  }
}
