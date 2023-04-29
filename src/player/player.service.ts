import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreatePlayerInput } from './dto/create-player.input';
import { UpdatePlayerInput } from './dto/update-player.input';
import { Player } from './entities/player.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationGroupInput } from 'src/group/dto/pagination-group.input';
import { PlayerStatisticsService } from 'src/player-statistics/player-statistics.service';
import { Parent, ResolveField } from '@nestjs/graphql';
import { PlayerStatistics } from 'src/player-statistics/entities/player-statistic.entity';
import { GroupToPlayer } from 'src/group-to-player/entities/group-to-player.entity';
import { GroupToPlayerService } from 'src/group-to-player/group-to-player.service';
import { Match } from 'src/match/entities/match.entity';
import { MatchService } from 'src/match/match.service';
import { MatchToPlayer } from 'src/match-to-player/entities/match-to-player.entity';
import { MatchToPlayerService } from 'src/match-to-player/match-to-player.service';
import { Message } from 'src/message/entities/message.entity';
import { MessageService } from 'src/message/message.service';
import { SearchMatchInput } from 'src/match/dto/search-match.input';
import { SearchPlayerInput } from './dto/search-player.input';
import { NotFoundError } from 'rxjs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player) private playerRepository: Repository<Player>,
    @InjectRepository(PlayerStatistics)
    private playerStatisticsRepository: Repository<PlayerStatistics>,
    @Inject(forwardRef(() => PlayerStatisticsService))
    private playerStatisticsService: PlayerStatisticsService,
    @Inject(forwardRef(() => GroupToPlayerService))
    private groupToPlayerService: GroupToPlayerService,
    @Inject(forwardRef(() => MatchService))
    private readonly matchService: MatchService,
    @Inject(forwardRef(() => MatchToPlayerService))
    private readonly matchToPlayerService: MatchToPlayerService,
    @Inject(forwardRef(() => MessageService))
    private readonly MessageService: MessageService,
  ) {}

  async create(createPlayerInput: CreatePlayerInput): Promise<Player> {
    //Find Latest ID Inserted
    const queryBuilderStatistics =
      this.playerStatisticsRepository.createQueryBuilder('player-statistics');
    queryBuilderStatistics.select('MAX(player-statistics.id)', 'maxId');
    const maxPlayerStatisticsId = await queryBuilderStatistics.getRawOne();

    const queryBuilder = this.playerRepository.createQueryBuilder('player');
    queryBuilder.select('MAX(player.id)', 'maxId');
    const maxPlayerId = await queryBuilder.getRawOne();

    const playerStats = this.playerStatisticsRepository.create({
      id: maxPlayerStatisticsId.maxId + 1,
      rate: 0,
      matchesNumber: 0,
      position: 'Attack',
    });

    createPlayerInput.password = await bcrypt.hash(
      createPlayerInput.password,
      12,
    );
    const player = this.playerRepository.create(createPlayerInput);
    player.id = maxPlayerId.maxId + 1;

    player.playerStatisticsId = playerStats.id;
    playerStats.playerId = player.id;

    const NewPlayer = this.playerRepository.save(player);
    this.playerStatisticsRepository.save(playerStats);
    return NewPlayer;
  }

  async findAll(paginationInput: PaginationGroupInput): Promise<Player[]> {
    return this.playerRepository.find({
      take: paginationInput.take,
      skip: paginationInput.skip,
    });
  }

  async search(searchPlayerInput: SearchPlayerInput): Promise<Player[]> {
    const query = this.playerRepository
      .createQueryBuilder('player')
      .where('player.position = :position', {
        position: searchPlayerInput.position,
      })
      .andWhere('player.rate > :rate', { rate: searchPlayerInput.minRate })
      .getMany();

    return query;
  }

  async findOne(id: number): Promise<Player> {
    return this.playerRepository.findOneOrFail({ where: { id } });
  }

  async update(updatePlayerInput: UpdatePlayerInput): Promise<Player> {
    updatePlayerInput.password = await bcrypt.hash(
      updatePlayerInput.password,
      12,
    );
    return this.playerRepository.save(updatePlayerInput);
  }

  async remove(id: number): Promise<Player> {
    const player = await this.playerRepository.findOne({ where: { id: id } });

    await this.playerStatisticsRepository.delete({
      id: player.playerStatisticsId,
    });
    await this.playerRepository.delete({ id });

    return player;
  }

  async findPlayerByUsername(username: string): Promise<Player> {
    return this.playerRepository.findOne({
      where: { username },
    });
  }

  async getPlayerStatistics(statisticsId: number): Promise<PlayerStatistics> {
    return this.playerStatisticsService.findOne(statisticsId);
  }

  async getGroupToPlayer(playerId: number): Promise<GroupToPlayer[]> {
    return this.groupToPlayerService.findByPlayerId(playerId);
  }

  async getCreatedMatches(playerId: number): Promise<Match[]> {
    return this.matchService.getMatchesByCreatorId(playerId);
  }

  async getMatchToPlayers(playerId: number): Promise<MatchToPlayer[]> {
    return this.matchToPlayerService.findMatchToPlayerByPlayerId(playerId);
  }

  async getMessages(playerId: number): Promise<Message[]> {
    return this.MessageService.getMessagesBySenderId(playerId);
  }
}
