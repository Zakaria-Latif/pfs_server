import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { MatchToPlayerService } from '../match-to-player.service';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(private readonly matchToPlayersService: MatchToPlayerService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const matchToPlayerId = ctx.getArgs().id;
    const userId = ctx.getContext().req.user.id;

    const matchToPlayer = await this.matchToPlayersService.findOne(matchToPlayerId);

    if (!matchToPlayer) {
      return false;
    }

    if (matchToPlayer.playerId !== userId) {
      throw new ForbiddenException("You don't have permission perform this operation, you don't have ownership");
    }

    return true;
  }
}