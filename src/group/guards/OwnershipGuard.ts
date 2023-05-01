import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GroupService } from '../group.service';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(private readonly groupsService: GroupService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const groupId = ctx.getArgs().id;
    const userId = ctx.getContext().req.user.id;

    const group = await this.groupsService.findOne(groupId);

    if (!group) {
      return false;
    }

    if (group.creatorId !== userId) {
      throw new ForbiddenException("You don't have permission perform this operation, you don't have ownership");
    }

    return true;
  }
}