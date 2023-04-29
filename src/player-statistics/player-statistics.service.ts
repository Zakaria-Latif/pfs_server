import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreatePlayerStatisticInput } from './dto/create-player-statistic.input';
import { UpdatePlayerStatisticInput } from './dto/update-player-statistic.input';
import { PlayerStatistics } from './entities/player-statistic.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationGroupInput } from 'src/group/dto/pagination-group.input';
import { Parent } from '@nestjs/graphql';
import { Player } from 'src/player/entities/player.entity';
import { PlayerService } from 'src/player/player.service';

@Injectable()
export class PlayerStatisticsService {
  constructor(
    @InjectRepository(PlayerStatistics)
    private playerStatisticsRepository: Repository<PlayerStatistics>,
    @Inject(forwardRef(() => PlayerService))
    private readonly playerService: PlayerService,
  ) {}
  async create(
    createPlayerStatisticInput: CreatePlayerStatisticInput,
  ): Promise<PlayerStatistics> {
    return null;
  }

  async findAll(
    paginationInput: PaginationGroupInput,
  ): Promise<PlayerStatistics[]> {
    return this.playerStatisticsRepository.find({
      take: paginationInput.take,
      skip: paginationInput.skip,
    });
  }

  async findOne(id: number) {
    return this.playerStatisticsRepository.findOneOrFail({ where: { id } });
  }

  async update(
    updatePlayerStatisticInput: UpdatePlayerStatisticInput,
  ): Promise<PlayerStatistics> {
    await this.playerStatisticsRepository.save(updatePlayerStatisticInput);
    return this.playerStatisticsRepository.findOneOrFail({
      where: { id: updatePlayerStatisticInput.id },
    });
  }

  async remove(id: number): Promise<PlayerStatistics> {
    return null;
  }

  async getPlayer(playerId: number): Promise<Player> {
    return this.playerService.findOne(playerId);
  }
}
