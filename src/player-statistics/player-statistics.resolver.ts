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
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/JwtAuthGuard';
import { OwnershipGuard } from './guards/OwnershipGuard';

@Resolver(() => PlayerStatistics)
export class PlayerStatisticsResolver {
  constructor(
    private readonly playerStatisticsService: PlayerStatisticsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [PlayerStatistics], { name: 'playerStatistic' })
  async findAll(
    @Args('paginationInput') paginationInput: PaginationGroupInput,
  ): Promise<PlayerStatistics[]> {
    return this.playerStatisticsService.findAll(paginationInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => PlayerStatistics, { name: 'playerStatistic' })
  async findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<PlayerStatistics> {
    return this.playerStatisticsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @Mutation(() => PlayerStatistics)
  async updatePlayerStatistic(
    @Args('updatePlayerStatisticInput')
    updatePlayerStatisticInput: UpdatePlayerStatisticInput,
  ): Promise<PlayerStatistics> {
    return this.playerStatisticsService.update(updatePlayerStatisticInput);
  }

  @ResolveField((returns) => Player)
  async player(@Parent() playerStatistics: PlayerStatistics): Promise<Player> {
    return this.playerStatisticsService.getPlayer(playerStatistics.playerId);
  }
}
