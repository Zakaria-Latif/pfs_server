import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { MatchService } from './match.service';
import { Match } from './entities/match.entity';
import { CreateMatchInput } from './dto/create-match.input';
import { UpdateMatchInput } from './dto/update-match.input';
import { PaginationGroupInput } from 'src/group/dto/pagination-group.input';
import { Player } from 'src/player/entities/player.entity';
import { MatchToPlayer } from 'src/match-to-player/entities/match-to-player.entity';
import { SearchMatchInput } from './dto/search-match.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/JwtAuthGuard';
import { OwnershipGuard } from './guards/OwnershipGuard';
import { Request } from 'src/request/entities/request.entity';
import { Invitation } from 'src/invitation/entities/invitation.entity';

@Resolver(() => Match)
export class MatchResolver {
  constructor(private readonly matchService: MatchService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Match, { name: 'createMatch' })
  async createMatch(
    @Args('createMatchInput') createMatchInput: CreateMatchInput,
  ): Promise<Match> {
    return this.matchService.create(createMatchInput);
  }

  // @UseGuards(JwtAuthGuard)
  @Query(() => [Match], { name: 'matches' })
  async findAll(
    @Args('paginationInput') paginationInput: PaginationGroupInput,
  ): Promise<Match[]> {
    return this.matchService.findAll(paginationInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Match], { name: 'search' })
  async searchMatches(
    @Args('searchMatchInput') searchMatchInput: SearchMatchInput,
  ): Promise<Match[]> {
    return this.matchService.search(searchMatchInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Match, { name: 'match' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<Match> {
    return this.matchService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @Mutation(() => Match)
  async updateMatch(
    @Args('updateMatchInput') updateMatchInput: UpdateMatchInput,
  ): Promise<Match> {
    return this.matchService.update(updateMatchInput.id, updateMatchInput);
  }

  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @Mutation(() => Match, { name: 'removeMatch' })
  async removeMatch(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Match> {
    return this.matchService.remove(id);
  }

  @ResolveField((returns) => Player)
  async creator(@Parent() match: Match): Promise<Player> {
    return this.matchService.getCreator(match.creatorId);
  }

  @ResolveField((returns) => [MatchToPlayer])
  async players(@Parent() match: Match): Promise<MatchToPlayer[]> {
    return this.matchService.getPlayers(match.id);
  }

  @ResolveField((returns) => [Request])
  async getPlayerRequests(@Parent() match: Match): Promise<Request[]> {
    return this.matchService.getPlayerRequests(match.id);
  }

  @ResolveField((returns) => [Invitation])
  async getPlayerInvitations(@Parent() match: Match): Promise<Invitation[]> {
    return this.matchService.getPlayerInvitations(match.id);
  }
}
