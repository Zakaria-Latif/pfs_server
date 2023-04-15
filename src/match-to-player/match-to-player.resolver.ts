import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { MatchToPlayerService } from './match-to-player.service';
import { MatchToPlayer } from './entities/match-to-player.entity';
import { CreateMatchToPlayerInput } from './dto/create-match-to-player.input';
import { UpdateMatchToPlayerInput } from './dto/update-match-to-player.input';
import { PaginationGroupInput } from 'src/group/dto/pagination-group.input';
import { Player } from 'src/player/entities/player.entity';
import { Match } from 'src/match/entities/match.entity';

@Resolver(() => MatchToPlayer)
export class MatchToPlayerResolver {
  constructor(private readonly matchToPlayerService: MatchToPlayerService) {}

  @Mutation(() => MatchToPlayer)
  async createMatchToPlayer(@Args('createMatchToPlayerInput') createMatchToPlayerInput: CreateMatchToPlayerInput):  Promise<MatchToPlayer> {
    return this.matchToPlayerService.create(createMatchToPlayerInput);
  }

  @Query(() => [MatchToPlayer], { name: 'matchToPlayer' })
  async findAll(@Args("paginationInput") paginationInput: PaginationGroupInput): Promise<MatchToPlayer[]> {
    return this.matchToPlayerService.findAll(paginationInput);
  }

  @Query(() => MatchToPlayer, { name: 'matchToPlayer' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<MatchToPlayer> {
    return this.matchToPlayerService.findOne(id);
  }

  @Mutation(() => MatchToPlayer)
  async updateMatchToPlayer(@Args('updateMatchToPlayerInput') updateMatchToPlayerInput: UpdateMatchToPlayerInput): Promise<MatchToPlayer> {
    return this.matchToPlayerService.update(updateMatchToPlayerInput.id, updateMatchToPlayerInput);
  }

  @Mutation(() => MatchToPlayer)
  async removeMatchToPlayer(@Args('id', { type: () => Int }) id: number): Promise<MatchToPlayer> {
    return this.matchToPlayerService.remove(id);
  }

  @ResolveField(returns=>Player)
  async player(@Parent() matchToPlayer: MatchToPlayer): Promise<Player>{
    return this.matchToPlayerService.getPlayer(matchToPlayer.playerId);
  }

  @ResolveField(returns=>Match)
  async match(@Parent() matchToPlayer: MatchToPlayer): Promise<Match>{
    return this.matchToPlayerService.getMatch(matchToPlayer.matchId);
  }
}
