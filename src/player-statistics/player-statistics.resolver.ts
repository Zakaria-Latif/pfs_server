import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PlayerStatisticsService } from './player-statistics.service';
import { PlayerStatistics } from './entities/player-statistic.entity';
import { CreatePlayerStatisticInput } from './dto/create-player-statistic.input';
import { UpdatePlayerStatisticInput } from './dto/update-player-statistic.input';
import { PaginationGroupInput } from 'src/group/dto/pagination-group.input';
import { Player } from 'src/player/entities/player.entity';

@Resolver(() => PlayerStatistics)
export class PlayerStatisticsResolver {
  constructor(
    private readonly playerStatisticsService: PlayerStatisticsService,
  ) {}

  /*@Mutation(() => PlayerStatistics)
  async createPlayerStatistic(@Args('createPlayerStatisticInput') createPlayerStatisticInput: CreatePlayerStatisticInput): Promise<PlayerStatistics> {
    return this.playerStatisticsService.create(createPlayerStatisticInput);
  }*/

  @Query(() => [PlayerStatistics], { name: 'playerStatistic' })
  async findAll(
    @Args('paginationInput') paginationInput: PaginationGroupInput,
  ): Promise<PlayerStatistics[]> {
    return this.playerStatisticsService.findAll(paginationInput);
  }

  @Query(() => PlayerStatistics, { name: 'playerStatistic' })
  async findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<PlayerStatistics> {
    return this.playerStatisticsService.findOne(id);
  }

  @Mutation(() => PlayerStatistics)
  async updatePlayerStatistic(
    @Args('updatePlayerStatisticInput')
    updatePlayerStatisticInput: UpdatePlayerStatisticInput,
  ): Promise<PlayerStatistics> {
    return this.playerStatisticsService.update(updatePlayerStatisticInput);
  }

  /*@Mutation(() => PlayerStatistics)
  async removePlayerStatistic(@Args('id', { type: () => Int }) id: number): Promise<PlayerStatistics> {
    return this.playerStatisticsService.remove(id);
  }*/

  @ResolveField((returns) => Player)
  async player(@Parent() playerStatistics: PlayerStatistics): Promise<Player> {
    return this.playerStatisticsService.getPlayer(playerStatistics.playerId);
  }
}
