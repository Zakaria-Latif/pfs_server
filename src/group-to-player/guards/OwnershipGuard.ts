import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GroupToPlayerService } from '../group-to-player.service';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(private readonly groupToPlayersService: GroupToPlayerService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const groupToPlayerId = ctx.getArgs().id;
    const userId = ctx.getContext().req.user.id;

    const groupToPlayer = await this.groupToPlayersService.findOne(groupToPlayerId);

    if (!groupToPlayer) {
      return false;
    }

    if (groupToPlayer.playerId !== userId) {
      throw new ForbiddenException("You don't have permission perform this operation, you don't have ownership");
    }

    return true;
  }
}