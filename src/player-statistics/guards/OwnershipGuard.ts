import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PlayerStatisticsService } from '../player-statistics.service';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(private readonly playersService: PlayerStatisticsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const playerStatisticsId = ctx.getArgs().id;
    const userId = ctx.getContext().req.user.id;

    const player = await this.playersService.findOne(playerStatisticsId)

    if (!player) {
      return false;
    }

    if (player.playerId !== userId) {
      throw new ForbiddenException();
    }

    return true;
  }
}