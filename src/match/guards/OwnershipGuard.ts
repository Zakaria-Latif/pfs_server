import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { MatchService } from '../match.service';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(private readonly matchsService: MatchService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const matchId = ctx.getArgs().id;
    const userId = ctx.getContext().req.user.id;

    const match = await this.matchsService.findOneById(matchId);

    if (!match) {
      return false;
    }

    if (match.creatorId !== userId) {
      throw new ForbiddenException("You don't have permission perform this operation, you don't have ownership");
    }

    return true;
  }
}