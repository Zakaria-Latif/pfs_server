import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { Request } from './entities/request.entity';
import { CreateRequestInput } from './dto/create-request.input';
import { UpdateRequestInput } from './dto/update-request.input';
import { RequestService } from './request.service';
import { Match } from 'src/match/entities/match.entity';
import { Player } from 'src/player/entities/player.entity';

@Resolver(() => Request)
export class RequestResolver {
  constructor(private readonly requestService: RequestService) {}

  @Query(() => [Request])
  async requests(): Promise<Request[]> {
    return this.requestService.findAll();
  }

  @Query(() => Request)
  async request(@Args('id', { type: () => Int }) id: number): Promise<Request> {
    return this.requestService.findOne(id);
  }

  @Query(() => [Request])
  async requestsByCreatorId(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Request[]> {
    return this.requestService.findAllByCreatorId(id);
  }

  @Query(() => [Request])
  async requestsByMatchId(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Request[]> {
    return this.requestService.findAllByMatchId(id);
  }

  @Mutation(() => Request)
  async createRequest(
    @Args('createRequestInput') createRequestInput: CreateRequestInput,
  ): Promise<Request> {
    return this.requestService.create(createRequestInput);
  }

  @Mutation(() => Request)
  async updateRequest(
    @Args('updateRequestInput') updateRequestInput: UpdateRequestInput,
  ): Promise<Request> {
    return this.requestService.update(updateRequestInput);
  }

  @Mutation(() => Request)
  async removeRequest(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Request> {
    return this.requestService.remove(id);
  }

  @Mutation(() => Request)
  async acceptMatchRequest(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Request> {
    return this.requestService.acceptMatchRequest(id);
  }

  @Mutation(() => Request)
  async refuseMatchRequest(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Request> {
    return this.requestService.refuseMatchRequest(id);
  }

  @ResolveField(() => Player)
  async creator(@Parent() request: Request): Promise<Player> {
    return this.requestService.getCreator(request.creatorId);
  }

  @ResolveField(() => Player)
  async recipient(@Parent() request: Request): Promise<Player> {
    const { matchId } = request;
    return this.requestService.getRecipient(matchId);
  }

  @ResolveField(() => Match)
  async match(@Parent() request: Request): Promise<Match> {
    return this.requestService.getMatch(request.matchId);
  }
}
