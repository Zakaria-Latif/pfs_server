import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PlayerService } from '../player.service';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(private readonly playersService: PlayerService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const playerId = ctx.getArgs().id;
    const userId = ctx.getContext().req.user.id;

    const player = await this.playersService.findOne(playerId)

    if (!player) {
      return false;
    }

    if (player.id !== userId) {
      throw new ForbiddenException();
    }

    return true;
  }
}