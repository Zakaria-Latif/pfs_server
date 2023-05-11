import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInvitationInput } from './dto/create-invitation.input';
import { UpdateInvitationInput } from './dto/update-invitation.input';
import { Invitation } from './entities/invitation.entity';
import { MatchService } from 'src/match/match.service';
import { CreateNotificationInput } from 'src/notification/dto/create-notification.input';
import { PlayerService } from 'src/player/player.service';
import { NotificationService } from 'src/notification/notification.service';
import { RequestType } from 'src/notification/dto/request-type.enum';
import { Player } from 'src/player/entities/player.entity';
import { Match } from 'src/match/entities/match.entity';
import { MatchToPlayerService } from 'src/match-to-player/match-to-player.service';
import { CreateMatchToPlayerInput } from 'src/match-to-player/dto/create-match-to-player.input';

@Injectable()
export class InvitationService {
  constructor(
    @InjectRepository(Invitation)
    private readonly invitationRepository: Repository<Invitation>,
    @Inject(forwardRef(() => MatchService))
    private readonly matchService: MatchService,
    @Inject(forwardRef(() => PlayerService))
    private readonly playerService: PlayerService,
    @Inject(forwardRef(() => NotificationService))
    private readonly notificationService: NotificationService,
    @Inject(forwardRef(() => MatchToPlayerService))
    private readonly matchToPlayerService: MatchToPlayerService,
  ) {}

  async findAll(): Promise<Invitation[]> {
    return this.invitationRepository.find();
  }

  async findOne(id: number): Promise<Invitation> {
    return this.invitationRepository.findOne({ where: { id } });
  }

  async findAllByRecipientId(recipientId: number): Promise<Invitation[]> {
    return this.invitationRepository.find({ where: { recipientId } });
  }

  async findAllByMatchId(matchId: number): Promise<Invitation[]> {
    return this.invitationRepository.find({ where: { matchId } });
  }

  async create(
    createInvitationInput: CreateInvitationInput,
  ): Promise<Invitation> {
    const match = await this.matchService.findOne(
      createInvitationInput.matchId,
    );

    const recipient = await this.playerService.findOne(
      createInvitationInput.recipientId,
    );

    const creator = await this.playerService.findOne(match.creatorId);

    const invitation = new Invitation();
    invitation.matchId = createInvitationInput.matchId;
    invitation.recipientId = createInvitationInput.recipientId;
    invitation.creatorId = match.creatorId;

    const createdInvitation = await this.invitationRepository.save(invitation);

    // Create a notification to inform the recipient about the new invitation
    const createNotificationInput = new CreateNotificationInput();
    createNotificationInput.title = 'Match Invitation';
    createNotificationInput.message = `${creator.username} sent a match Invitation for ${match.name}`;
    createNotificationInput.recipientId = recipient.id;
    createNotificationInput.type = RequestType.INVITATION;

    await this.notificationService.createNotification(createNotificationInput);

    return createdInvitation;
  }

  async update(
    updateInvitationInput: UpdateInvitationInput,
  ): Promise<Invitation> {
    await this.invitationRepository.save(updateInvitationInput);

    return this.invitationRepository.findOneOrFail({
      where: { id: updateInvitationInput.id },
    });
  }

  async remove(id: number): Promise<Invitation> {
    const invitation = await this.invitationRepository.findOne({
      where: { id: id },
    });
    await this.invitationRepository.delete({ id });
    return invitation;
  }

  async acceptInvitation(id: number): Promise<Invitation> {
    const invitation = await this.invitationRepository.findOne({
      where: { id: id },
      relations: ['match', 'recipient'],
    });
    if (!invitation) {
      throw new Error('Invitation not found');
    }
    invitation.isAccepted = true;
    await this.invitationRepository.save(invitation);

    //Create MatchToPlayer
    const match = invitation.match;
    const recipient = invitation.recipient;

    const matchToPlayerinput = new CreateMatchToPlayerInput();

    matchToPlayerinput.matchId = match.id;
    matchToPlayerinput.playerId = recipient.id;

    await this.matchToPlayerService.create(matchToPlayerinput);

    // Create a notification to inform the recipient that the invitation has been accepted
    const createNotificationInput = new CreateNotificationInput();
    createNotificationInput.title = 'Invitation Accepted';
    createNotificationInput.message = `Your invitation for match ${match.name} has been accepted by ${recipient.username}`;
    createNotificationInput.recipientId = match.creatorId;
    createNotificationInput.type = RequestType.MESSAGE;

    await this.notificationService.createNotification(createNotificationInput);

    return invitation;
  }

  async refuseInvitation(id: number): Promise<Invitation> {
    const invitation = await this.invitationRepository.findOne({
      where: { id: id },
      relations: ['match', 'recipient'],
    });
    if (!invitation) {
      throw new Error('Invitation not found');
    }

    const match = invitation.match;
    const recipient = invitation.recipient;

    // Create a notification to inform the recipient that the invitation has been refused
    const createNotificationInput = new CreateNotificationInput();
    createNotificationInput.title = 'Invitation Refused';
    createNotificationInput.message = `Your invitation for match ${match.name} has been refused by ${recipient.username}`;
    createNotificationInput.recipientId = match.creatorId;
    createNotificationInput.type = RequestType.MESSAGE;

    await this.notificationService.createNotification(createNotificationInput);

    await this.invitationRepository.delete(invitation.id);
    return invitation;
  }

  async getCreator(matchId: number): Promise<Player> {
    const match = this.matchService.findOne(matchId);
    return this.playerService.findOne((await match).creatorId);
  }

  async getRecipient(recipientId: number): Promise<Player> {
    return this.playerService.findOne(recipientId);
  }

  async getMatch(matchId: number): Promise<Match> {
    return this.matchService.findOne(matchId);
  }
}
