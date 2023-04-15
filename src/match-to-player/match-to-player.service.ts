import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateMatchToPlayerInput } from './dto/create-match-to-player.input';
import { UpdateMatchToPlayerInput } from './dto/update-match-to-player.input';
import { MatchToPlayer } from './entities/match-to-player.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationGroupInput } from 'src/group/dto/pagination-group.input';
import { PlayerService } from 'src/player/player.service';
import { Player } from 'src/player/entities/player.entity';
import { MatchService } from 'src/match/match.service';
import { Match } from 'src/match/entities/match.entity';

@Injectable()
export class MatchToPlayerService {
  constructor(@InjectRepository(MatchToPlayer) private matchToPlayerRepository: Repository<MatchToPlayer>,
  @Inject(forwardRef(() => PlayerService))
  private readonly playerService: PlayerService,
  @Inject(forwardRef(() => MatchService))
  private readonly matchService: MatchService,
  ){}
  
  async create(createMatchToPlayerInput: CreateMatchToPlayerInput): Promise<MatchToPlayer> {
    return null;
  }

  async findAll(paginationInput: PaginationGroupInput): Promise<MatchToPlayer[]> {
    return this.matchToPlayerRepository.find({
      take: paginationInput.take,
      skip: paginationInput.skip
    });
  }

  async findOne(id: number): Promise<MatchToPlayer> {
    return this.matchToPlayerRepository.findOneOrFail({ where: { id } });
  }

  async update(id: number, updateMatchToPlayerInput: UpdateMatchToPlayerInput): Promise<MatchToPlayer> {
    return null;
  }

  async remove(id: number): Promise<MatchToPlayer> {
    return null;
  }

  async findMatchToPlayerByPlayerId(playerId: number): Promise<MatchToPlayer[]>{
    return this.matchToPlayerRepository.find({
      where: {
        playerId
      }
    })
  }
  async findMatchToPlayerByMatchId(matchId: number): Promise<MatchToPlayer[]>{
    return this.matchToPlayerRepository.find({
      where: {
        matchId
      }
    })
  }

  async getPlayer(playerId: number): Promise<Player>{
    return this.playerService.findOne(playerId);
  }

  async getMatch(matchId: number): Promise<Match>{
    return this.matchService.findOne(matchId);
  }
}
