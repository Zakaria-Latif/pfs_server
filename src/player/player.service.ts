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

@Injectable()
export class PlayerService {
  constructor(@InjectRepository(Player) private playerRepository: Repository<Player>, 
    @Inject(forwardRef(() => PlayerStatisticsService))
    private playerStatisticsService: PlayerStatisticsService,
    @Inject(forwardRef(() => GroupToPlayerService))
    private groupToPlayerService: GroupToPlayerService,
    @Inject(forwardRef(() => MatchService))
    private readonly matchService: MatchService,
    @Inject(forwardRef(() => MatchToPlayerService))
    private readonly matchToPlayerService: MatchToPlayerService,
    @Inject(forwardRef(() => MessageService))
    private readonly MessageService: MessageService
  ){}

  async create(createPlayerInput: CreatePlayerInput): Promise<Player>{
    const player = new Player();
    player.username = createPlayerInput.username;
    player.password = createPlayerInput.password;
    player.email = createPlayerInput.email;
    player.location = 'New York';
    player.isVerified = false;
    player.description = 'Lorem ipsum dolor sit amet';

    const playerStatistics = new PlayerStatistics();
    playerStatistics.rate = 0;
    playerStatistics.matchesNumber = 0;
    playerStatistics.position = 'Defense';

    player.playerStatistics = playerStatistics;
    return this.playerRepository.save(player);
  };

  async findAll(paginationInput: PaginationGroupInput): Promise<Player[]> {
    return this.playerRepository.find({
      take: paginationInput.take,
      skip: paginationInput.skip
    });
  }

  async search(searchPlayerInput: SearchPlayerInput): Promise<Player[]>{
    const query = this.playerRepository.createQueryBuilder('player')
      .where('player.position = :position', { position: searchPlayerInput.position })
      .andWhere('player.rate > :rate', { rate: searchPlayerInput.minRate })
      .getMany();

    return query;
  }

  async findOne(id: number): Promise<Player> {
    return this.playerRepository.findOneOrFail({ where: { id } });
  }

  async update(id: number, updatePlayerInput: UpdatePlayerInput): Promise<Player> {
    return null;
  }

  async remove(id: number): Promise<Player> {
    const player = await this.playerRepository.findOneById(id);
    if (!player) {
      throw new NotFoundError(`Player with id ${id} not found`);
    }
    await this.playerRepository.remove(player);
    return player;
  }

  async findPlayerByUsername(username: string): Promise<Player>{
    return this.playerRepository.findOne({
      where: { username }
    })
  }
  
  async getPlayerStatistics(statisticsId: number): Promise<PlayerStatistics>{
    return this.playerStatisticsService.findOne(statisticsId);
  }

  async getGroupToPlayer(playerId: number): Promise<GroupToPlayer[]>{
    return this.groupToPlayerService.findByPlayerId(playerId);
  }

  async getCreatedMatches(playerId: number): Promise<Match[]>{
    return this.matchService.getMatchesByCreatorId(playerId);
  }

  async getMatchToPlayers(playerId: number): Promise<MatchToPlayer[]>{
    return this.matchToPlayerService.findMatchToPlayerByPlayerId(playerId);
  }

  async getMessages(playerId: number): Promise<Message[]>{
    return this.MessageService.getMessagesBySenderId(playerId);
  }


}
