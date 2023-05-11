import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { Invitation } from './entities/invitation.entity';
import { InvitationService } from './invitation.service';
import { CreateInvitationInput } from './dto/create-invitation.input';
import { UpdateInvitationInput } from './dto/update-invitation.input';
import { Match } from 'src/match/entities/match.entity';
import { Player } from 'src/player/entities/player.entity';

@Resolver(() => Invitation)
export class InvitationResolver {
  constructor(private readonly invitationService: InvitationService) {}

  @Query(() => [Invitation])
  async invitations(): Promise<Invitation[]> {
    return this.invitationService.findAll();
  }

  @Query(() => Invitation, { nullable: true })
  async invitation(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Invitation> {
    return this.invitationService.findOne(id);
  }

  @Query(() => [Invitation])
  async invitationsByRecipientId(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Invitation[]> {
    return this.invitationService.findAllByRecipientId(id);
  }

  @Query(() => [Invitation])
  async invitationByMatchId(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Invitation[]> {
    return this.invitationService.findAllByMatchId(id);
  }

  @Mutation(() => Invitation)
  async createInvitation(
    @Args('createInvitationInput') createInvitationInput: CreateInvitationInput,
  ): Promise<Invitation> {
    return this.invitationService.create(createInvitationInput);
  }

  @Mutation(() => Invitation)
  async updateInvitation(
    @Args('updateInvitationInput') updateInvitationInput: UpdateInvitationInput,
  ): Promise<Invitation> {
    return this.invitationService.update(updateInvitationInput);
  }

  @Mutation(() => Invitation)
  async removeInvitation(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Invitation> {
    return this.invitationService.remove(id);
  }

  @Mutation(() => Invitation)
  async acceptInvitation(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Invitation> {
    return this.invitationService.acceptInvitation(id);
  }

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
