// server/src/movie/movie.resolver.ts
import {
    Query,
    Resolver,
  } from '@nestjs/graphql';
  import { Match } from './match.entity';
  import { MatchService } from './match.service';
  
  @Resolver(() => Match)
  export class MatchResolver {
    constructor(
      private matchService: MatchService,
      // private movieCommentService: MovieCommentService,
    ) {}
  
    @Query(() => [Match])
    async getAllMatches(): Promise<Match[]> {
      return this.matchService.getAllMatches();
    }
  
  }