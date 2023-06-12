import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRequestInput } from './dto/create-request.input';
import { UpdateRequestInput } from './dto/update-request.input';
import { Request } from './entities/request.entity';
import { MatchService } from 'src/match/match.service';
import { CreateNotificationInput } from 'src/notification/dto/create-notification.input';
import { PlayerService } from 'src/player/player.service';
import { MatchToPlayerService } from 'src/match-to-player/match-to-player.service';
import { NotificationService } from 'src/notification/notification.service';
import { RequestType } from 'src/notification/dto/request-type.enum';
import { CreateMatchToPlayerInput } from 'src/match-to-player/dto/create-match-to-player.input';
import { Player } from 'src/player/entities/player.entity';
import { Match } from 'src/match/entities/match.entity';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Request)
    private readonly requestRepository: Repository<Request>,
    @Inject(forwardRef(() => MatchService))
    private readonly matchService: MatchService,
    @Inject(forwardRef(() => PlayerService))
    private readonly playerService: PlayerService,
    @Inject(forwardRef(() => MatchToPlayerService))
    private readonly matchToPlayerService: MatchToPlayerService,
    @Inject(forwardRef(() => NotificationService))
    private readonly notificationService: NotificationService,
  ) {}

  async findAll(): Promise<Request[]> {
    return this.requestRepository.find();
  }

  async findOne(id: number): Promise<Request> {
    return this.requestRepository.findOne({ where: { id: id } });
  }

  async findAllByCreatorId(creatorId: number): Promise<Request[]> {
    return this.requestRepository.find({ where: { creatorId } });
  }

  async findAllByMatchId(matchId: number): Promise<Request[]> {
    return this.requestRepository.find({ where: { matchId } });
  }

  async create(createRequestInput: CreateRequestInput): Promise<Request> {
    // Checking if a request has already made by the player for the match
    const request = await this.requestRepository.find({
      where: {
        matchId: createRequestInput.matchId,
        creatorId: createRequestInput.creatorId,
      },
    });
    if (request) {
      throw new BadRequestException(
        'Whoops you have already made a request to join, plz be patient',
      );
    }

    // Checking if the player is already in the match
    const matchToPlayer =
      this.matchToPlayerService.findMatchToPlayerByMatchIdAndPlayerId(
        createRequestInput.matchId,
        createRequestInput.matchId,
      );
    if (matchToPlayer) {
      throw new BadRequestException('Whoops you are already in the match');
    }

    const player = await this.playerService.findOne(
      createRequestInput.creatorId,
    );
    const match = await this.matchService.findOne(createRequestInput.matchId);

    //Check Players Number
    const matchToPlayers =
      await this.matchToPlayerService.findMatchToPlayerByMatchId(
        createRequestInput.matchId,
      );

    if (matchToPlayers.length < match.playersNumber) {
      // Notify the match creator about the new match request
      const createNotificationInput = new CreateNotificationInput();
      createNotificationInput.title = 'Match Request';
      createNotificationInput.message = `${player.username} sent a match request for ${match.name}`;
      createNotificationInput.recipientId = match.creatorId;
      createNotificationInput.type = RequestType.REQUEST;

      await this.notificationService.createNotification(
        createNotificationInput,
      );
      return this.requestRepository.save(createRequestInput);
    } else {
      throw new Error('Maximum number of players reached for the match.');
    }
  }

  async update(updateRequestInput: UpdateRequestInput): Promise<Request> {
    await this.requestRepository.save(updateRequestInput);

    return this.requestRepository.findOneOrFail({
      where: { id: updateRequestInput.id },
    });
  }

  async remove(id: number): Promise<Request> {
    const request = await this.requestRepository.findOne({ where: { id: id } });
    await this.requestRepository.delete({ id });
    return request;
  }

  async acceptMatchRequest(
    id: number,
    connectedPlayerId: number,
  ): Promise<Request> {
    //Update Request
    const request = await this.requestRepository.findOne({
      where: { id: id },
      relations: ['match', 'creator'],
    });
    if (!request) {
      throw new BadRequestException(
        'This request does not exist please verify the id',
      );
    }
    if (request.creatorId !== connectedPlayerId) {
      throw new UnauthorizedException(
        'You cannot accept this request, you are not the owner',
      );
    }

    request.isAccepted = true;
    await this.requestRepository.save(request);

    const match = request.match;
    const player = request.creator;
    const matchCreator = await this.playerService.findOne(match.creatorId);

    // Add the player to the match using the MatchToPlayer entity
    const createMatchToPlayer = new CreateMatchToPlayerInput();
    createMatchToPlayer.matchId = match.id;
    createMatchToPlayer.playerId = player.id;

    await this.matchToPlayerService.create(createMatchToPlayer);

    //Mark Old Notification as read
    const notification = await this.notificationService.getNotificationByEntity(
      request.id,
    );
    await this.notificationService.markNotificationAsRead(
      notification.id,
      connectedPlayerId,
    );

    // Create a notification to inform the player that the request has been accepted
    const createNotificationInput = new CreateNotificationInput();
    createNotificationInput.title = 'Request Accepted';
    createNotificationInput.message = `Your match request for ${match.name} has been accepted by ${matchCreator.username}`;
    createNotificationInput.recipientId = player.id;
    createNotificationInput.type = RequestType.MESSAGE;

    await this.notificationService.createNotification(createNotificationInput);
    return request;
  }

  async refuseMatchRequest(
    id: number,
    connectedPlayerId: number,
  ): Promise<Request> {
    const request = await this.requestRepository.findOne({ where: { id: id } });
    if (!request) {
      throw new BadRequestException(
        'This request does not exist or it has already been accepted or deleted',
      );
    }
    const match = await this.matchService.findOne(request.matchId);
    const player = await this.playerService.findOne(request.creatorId);
    const matchCreator = await this.playerService.findOne(match.creatorId);

    //Mark Old Notification as read
    const notification = await this.notificationService.getNotificationByEntity(
      request.id,
    );
    await this.notificationService.markNotificationAsRead(
      notification.id,
      connectedPlayerId,
    );

    // Create a notification to inform the player that the request has been refused
    const createNotificationInput = new CreateNotificationInput();
    createNotificationInput.title = 'Request Refused';
    createNotificationInput.message = `Your match request for ${match.name} has been refused by ${matchCreator.username}`;
    createNotificationInput.recipientId = player.id;
    createNotificationInput.type = RequestType.MESSAGE;

    await this.notificationService.createNotification(createNotificationInput);

    await this.requestRepository.delete(request.id);

    return request;
  }

  async getCreator(creatorId: number): Promise<Player> {
    return this.playerService.findOne(creatorId);
  }

  async getRecipient(matchId: number): Promise<Player> {
    const match = this.matchService.findOne(matchId);
    return this.playerService.findOne((await match).creatorId);
  }

  async getMatch(matchId: number): Promise<Match> {
    return this.matchService.findOne(matchId);
  }
}
