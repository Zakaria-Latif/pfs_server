import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateMatchInput } from './dto/create-match.input';
import { UpdateMatchInput } from './dto/update-match.input';
import { Match } from './entities/match.entity';
import { LessThan, MoreThan,Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationGroupInput } from 'src/group/dto/pagination-group.input';
import { Player } from 'src/player/entities/player.entity';
import { PlayerService } from 'src/player/player.service';
import { MatchToPlayer } from 'src/match-to-player/entities/match-to-player.entity';
import { MatchToPlayerService } from 'src/match-to-player/match-to-player.service';
import { SearchMatchInput } from './dto/search-match.input';
import { NotFoundError } from 'rxjs';
import { CreateMatchToPlayerInput } from 'src/match-to-player/dto/create-match-to-player.input';
import { InvitationService } from 'src/invitation/invitation.service';
import { RequestService } from 'src/request/request.service';
import { Request } from 'src/request/entities/request.entity';
import { Invitation } from 'src/invitation/entities/invitation.entity';

@Injectable()
export class MatchService {
  
  constructor(
    @InjectRepository(Match) private matchRepository: Repository<Match>,
    @Inject(forwardRef(() => PlayerService))
    private readonly playerService: PlayerService,
    @Inject(forwardRef(() => MatchToPlayerService))
    private readonly matchToPlayerService: MatchToPlayerService,
    @Inject(forwardRef(() => RequestService))
    private readonly requestService: RequestService,
    @Inject(forwardRef(() => InvitationService))
    private readonly invitationService: InvitationService,
  ){}
  

  async create(createMatchInput: CreateMatchInput, creatorId: number): Promise<Match> {
    let match = await this.matchRepository.create({...createMatchInput, creatorId});
    match = await this.matchRepository.save(match);
    console.log(match);

    //create Match To Player
    const createMatchToPlayerInput = new CreateMatchToPlayerInput();
    createMatchToPlayerInput.matchId = match.id;
    createMatchToPlayerInput.playerId = creatorId;

    await this.matchToPlayerService.create(createMatchToPlayerInput);

    return match;
  }

  async findAll(paginationInput: PaginationGroupInput): Promise<Match[]> {
    // return this.matchRepository.find({
    //   skip: paginationInput.skip,
    //   take: paginationInput.take,
    // });
    
    // For testing
    return this.matchRepository.find();
  }

  myMatches(paginationInput: PaginationGroupInput, creatorId: number ): Match[] | PromiseLike<Match[]> {
    return this.matchRepository.find({
      skip: paginationInput.skip,
      take: paginationInput.take,
      where: {
        creatorId
      }
    });
  }

  async search(searchMatchInput: SearchMatchInput): Promise<Match[]> {
      const query = this.matchRepository
      .createQueryBuilder('match')
      .where('match.duration BETWEEN :min AND :max', {
        min: searchMatchInput.minDuration,
        max: searchMatchInput.maxDuration,
      })
      .andWhere('match.time BETWEEN :startDate AND :endDate', {
        startDate: searchMatchInput.dateFrom,
        endDate: searchMatchInput.dateTo,
      })
      .andWhere('match.name LIKE :name', { name: `%${searchMatchInput.searchTerm}%` })
      .orWhere('match.location LIKE :location', { location: `%${searchMatchInput.searchTerm}%` });
    return await query.getMany();

  }

  async findOne(id: number): Promise<Match> {
    return this.matchRepository.findOneOrFail({ where: { id } });
  }

  async update(id: number, updateMatchInput: UpdateMatchInput): Promise<Match> {
    return null;
  }

  async remove(id: number): Promise<Match> {
    const player = await this.matchRepository.findOneById(id);
    if (!player) {
      throw new NotFoundError(`Match with id ${id} not found`);
    }
    await this.matchRepository.remove(player);
    return player;
  }

  async getMatchesByCreatorId(creatorId: number): Promise<Match[]> {
    return this.matchRepository.find({
      where: {
        creatorId,
      },
    });
  }

  async getCreator(creatorId: number): Promise<Player> {
    return this.playerService.findOne(creatorId);
  }

  async getPlayers(matchId: number): Promise<MatchToPlayer[]> {
    return this.matchToPlayerService.findMatchToPlayerByMatchId(matchId);
  }

  async findOneById(id: number): Promise<Match> {
    return await this.matchRepository.findOne({ where: { id } });
  }

  async getPlayerRequests(matchId: number): Promise<Request[]> {
    return this.requestService.findAllByMatchId(matchId);
  }

  async getPlayerInvitations(matchId: number): Promise<Invitation[]> {
    return this.invitationService.findAllByMatchId(matchId);
  }


  async members(id: number): Promise<Player[]> {
    const matchToPlayers = await this.matchToPlayerService.findMatchToPlayerByMatchId(id);
    const playerIds = matchToPlayers.map(matchToPlayer => matchToPlayer.playerId);
    return this.playerService.findPlayersByIds(playerIds);

  }

  async getPlayedMatch(id: number): Promise<Match> {
    const today = new Date();
    const match = await this.matchRepository
      .createQueryBuilder('match')
      .where({ id: id, time: LessThan(today) })
      .getOne();

    return match;
}

  async getPlannedMatchs(id: number): Promise<Match> {
    const today = new Date();
    const match = await this.matchRepository
      .createQueryBuilder('match')
      .where({ id: id, time: MoreThan(today) })
      .getOne();

    return match;

  }
}
