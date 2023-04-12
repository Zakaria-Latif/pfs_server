import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Player } from '@prisma/client';
import { Player as PlayerM } from "./player.entity";
import { CreatePlayerInput } from './player.input';
import { PlayerService } from './player.service';

@Resolver()
export class PlayerResolver {
    constructor(
        private playerService: PlayerService,
        // private movieCommentService: MovieCommentService,
      ) {}

    //Creating data
    @Mutation(returns=>PlayerM)
    async createPlayer(@Args("createPlayerInput") createPlayerInput: CreatePlayerInput): Promise<Player>{
        return this.playerService.createPlayer(createPlayerInput)
    }
}
