import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
  Context,
  CONTEXT,
} from '@nestjs/graphql';
import { Invitation } from './entities/invitation.entity';
import { InvitationService } from './invitation.service';
import { CreateInvitationInput } from './dto/create-invitation.input';
import { UpdateInvitationInput } from './dto/update-invitation.input';
import { Match } from 'src/match/entities/match.entity';
import { Player } from 'src/player/entities/player.entity';
import { JwtAuthGuard } from 'src/auth/guards/JwtAuthGuard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Invitation)
export class InvitationResolver {
  constructor(private readonly invitationService: InvitationService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [Invitation])

  async invitations(@Context() context: any): Promise<Invitation[]> {
    return this.invitationService.findAll(context.req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Invitation, { nullable: true })
  async invitation(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Invitation> {
    return this.invitationService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Invitation])
  async invitationsByRecipientId(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Invitation[]> {
    return this.invitationService.findAllByRecipientId(id);
  }

  @Query(() => [Invitation])
  async invitationsByCreatorId(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Invitation[]> {
    return this.invitationService.findAllByCreatorId(id);
  }
  
  @UseGuards(JwtAuthGuard)
  @Query(() => [Invitation])
  async invitationByMatchId(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Invitation[]> {
    return this.invitationService.findAllByMatchId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Invitation)
  async createInvitation(
    @Args('matchId') matchId: number,
    @Context() context: any
  ): Promise<Invitation> {
    return this.invitationService.create(matchId, context.req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Invitation)
  async updateInvitation(
    @Args('updateInvitationInput') updateInvitationInput: UpdateInvitationInput,
  ): Promise<Invitation> {
    return this.invitationService.update(updateInvitationInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Invitation)
  async removeInvitation(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Invitation> {
    return this.invitationService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Invitation)
  async acceptInvitation(
    @Args('id', { type: () => Int }) id: number,
    @Context() context: any
  ): Promise<Invitation> {
    return this.invitationService.acceptInvitation(id, context.req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Invitation)
  async refuseInvitation(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Invitation> {
    return this.invitationService.refuseInvitation(id);
  }

  @ResolveField(() => Player)
  async creator(@Parent() invitation: Invitation): Promise<Player> {
    return this.invitationService.getCreator(invitation.matchId);
  }

  @ResolveField(() => Player)
  async recipient(@Parent() invitation: Invitation): Promise<Player> {
    const { recipientId } = invitation;
    return this.invitationService.getRecipient(recipientId);
  }

  @ResolveField(() => Match)
  async match(@Parent() invitation: Invitation): Promise<Match> {
    const { matchId } = invitation;
    return this.invitationService.getMatch(matchId);
  }
}
