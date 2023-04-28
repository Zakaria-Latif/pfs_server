import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateMatchInput } from './dto/create-match.input';
import { UpdateMatchInput } from './dto/update-match.input';
import { Match } from './entities/match.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationGroupInput } from 'src/group/dto/pagination-group.input';
import { Player } from 'src/player/entities/player.entity';
import { PlayerService } from 'src/player/player.service';
import { MatchToPlayer } from 'src/match-to-player/entities/match-to-player.entity';
import { MatchToPlayerService } from 'src/match-to-player/match-to-player.service';
import { SearchMatchInput } from './dto/search-match.input';
import { NotFoundError } from 'rxjs';

@Injectable()
export class MatchService {
  constructor(@InjectRepository(Match) private matchRepository: Repository<Match>, 
    @Inject(forwardRef(() => PlayerService))
    private readonly playerService: PlayerService,
    @Inject(forwardRef(() => PlayerService))
    private readonly matchToPlayerService: MatchToPlayerService
  ){}
  
  async create(createMatchInput: CreateMatchInput):  Promise<Match> {
    return this.matchRepository.create(createMatchInput);
  }

  async findAll(paginationInput: PaginationGroupInput):  Promise<Match[]> {
    return this.matchRepository.find({
      skip: paginationInput.skip,
      take: paginationInput.take
    });
  }

  async search(searchMatchInput: SearchMatchInput): Promise<Match[]>{
    const query = this.matchRepository.createQueryBuilder('match')
    .where('match.duration BETWEEN :min AND :max', { min: searchMatchInput.minDuration, max: searchMatchInput.maxDuration })
    .andWhere('match.time BETWEEN :startDate AND :endDate', { startDate: searchMatchInput.dateFrom, endDate: searchMatchInput.dateTo });
    return await query.getMany();
  }

  async findOne(id: number):  Promise<Match> {
    return this.matchRepository.findOneOrFail({ where: { id } });;
  }

  async update(id: number, updateMatchInput: UpdateMatchInput):  Promise<Match> {
    return null;
  }

  async remove(id: number) :  Promise<Match>{
    const player = await this.matchRepository.findOneById(id);
    if (!player) {
      throw new NotFoundError(`Match with id ${id} not found`);
    }
    await this.matchRepository.remove(player);
    return player;
  }

  async getMatchesByCreatorId(creatorId: number): Promise<Match[]>{
    return this.matchRepository.find({
      where: {
        creatorId
      }
    })
  }

  async getCreator(creatorId: number): Promise<Player>{
    return this.playerService.findOne(creatorId);
  }

  async getPlayers(matchId: number): Promise<MatchToPlayer[]>{
    return this.matchToPlayerService.findMatchToPlayerByMatchId(matchId);
  }
}
