// server/src/movie/movie.resolver.ts
import {
  Args,
  Mutation,
    Query,
    Resolver,
  } from '@nestjs/graphql';
  import { MatchService } from './match.service';
import { AddPlayerToMatchInput, CreateMatchInput, FilterMatchInput, PaginationInput } from './match.input';
import { Match } from '@prisma/client';
import { Match as MatchM } from './match.entity';
  
  @Resolver(() => MatchM)
  export class MatchResolver {
    constructor(
      private matchService: MatchService,
      // private movieCommentService: MovieCommentService,
    ) {}
  
    //Reading data
    @Query(() => [MatchM])
    async getAllMatches(@Args("paginationInput") paginationInput: PaginationInput): Promise<Match[]> {
      return this.matchService.getAllMatches(paginationInput);
    }

    @Query(()=>[MatchM])
    async searchMatches(@Args("searchMatchesInput") filterMatchInput: FilterMatchInput): Promise<Match[]>{
      return this.matchService.searchMatches(filterMatchInput);
    }

    //Creating data
    @Mutation(returns=>MatchM)
    async createMatch(@Args("createMatchInput") createMatchInput: CreateMatchInput): Promise<Match>{
        return this.matchService.createMatch(createMatchInput);
    }

    //Updating data
    @Mutation(returns=>MatchM)
    async addPlayerToMatch(@Args("addPlayerToMatchInput") addPlayerToMatchInput: AddPlayerToMatchInput): Promise<Match>{
      return this.matchService.addPlayerToMatch(addPlayerToMatchInput);
    }
  
  }