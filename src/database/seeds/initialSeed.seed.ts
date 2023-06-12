import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Match } from '../../match/entities/match.entity';
import { Player } from '../../player/entities/player.entity';
import { PlayerStatistics } from '../../player-statistics/entities/player-statistic.entity';
import { MatchToPlayer } from '../../match-to-player/entities/match-to-player.entity';
import { Group } from '../../group/entities/group.entity';
import { GroupToPlayer } from '../../group-to-player/entities/group-to-player.entity';
import { Message } from '../../message/entities/message.entity';
import { Request } from '../../request/entities/request.entity';
import { Notification } from '../../notification/entities/notification.entity';
import { Invitation } from '../../invitation/entities/invitation.entity';

export default class InitialDatabaseSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    //Generate Unique Value
    const usedNumbers = [];
    const usedNumbers2 = [];
    const usedNumbers3 = [];

    function getRandomNumber(max, usedNumbers) {
      let randomNumber;
      do {
        randomNumber = Math.floor(Math.random() * max);
      } while (usedNumbers.includes(randomNumber));
      usedNumbers.push(randomNumber);
      return randomNumber;
    }

    //Generate Unique Value

    const players = await factory(Player)().createMany(25);

    const playerStatistics = await factory(PlayerStatistics)()
      .map(async (playerStatistics) => {
        playerStatistics.player =
          players[getRandomNumber(players.length, usedNumbers)];
        return playerStatistics;
      })
      .createMany(15);

    const matchs = await factory(Match)()
      .map(async (match) => {
        match.creator = players[Math.floor(Math.random() * players.length)];
        return match;
      })
      .createMany(20);

    const matchToPlayers = await factory(MatchToPlayer)()
      .map(async function (matchToPlayers) {
        matchToPlayers.player =
          players[Math.floor(Math.random() * players.length)];
        matchToPlayers.match =
          matchs[Math.floor(Math.random() * matchs.length)];
        return matchToPlayers;
      })
      .createMany(25);

    const groups = await factory(Group)()
      .map(async (group) => {
        group.creator = players[Math.floor(Math.random() * players.length)];
        return group;
      })
      .createMany(15);

    const groupToPlayers = await factory(GroupToPlayer)()
      .map(async (groupToPlayers) => {
        groupToPlayers.player =
          players[Math.floor(Math.random() * players.length)];
        groupToPlayers.group =
          groups[Math.floor(Math.random() * groups.length)];
        return groupToPlayers;
      })
      .createMany(25);

    const messages = await factory(Message)()
      .map(async (messages) => {
        messages.group = groups[Math.floor(Math.random() * groups.length)];
        messages.sender = players[Math.floor(Math.random() * players.length)];
        return messages;
      })
      .createMany(100);

    const requests = await factory(Request)()
      .map(async (request) => {
        request.match = matchs[Math.floor(Math.random() * matchs.length)];
        request.creator = players[Math.floor(Math.random() * players.length)];
        return request;
      })
      .createMany(100);

    const requestsNotifications = await factory(Notification)()
      .map(async (notification) => {
        notification.title = 'Match Request';
        notification.type = 'Request';
        const randomRequest =
          requests[getRandomNumber(requests.length, usedNumbers2)];
        notification.entityId = randomRequest.id;
        notification.message = `${randomRequest.creator.username} sent a match request for ${randomRequest.match.name}`;
        notification.recipient = randomRequest.match.creator;
        return notification;
      })
      .createMany(100);

    const invitations = await factory(Invitation)()
      .map(async (invitation) => {
        invitation.match = matchs[Math.floor(Math.random() * matchs.length)];
        invitation.creator =
          players[Math.floor(Math.random() * players.length)];
        invitation.recipient =
          players[Math.floor(Math.random() * players.length)];
        return invitation;
      })
      .createMany(100);

    const invitationNotifications = await factory(Notification)()
      .map(async (notification) => {
        notification.title = 'Match Invitation';
        notification.type = 'Invitation';
        const randomInvitation =
          invitations[getRandomNumber(invitations.length, usedNumbers3)];
        notification.entityId = randomInvitation.id;
        notification.message = `${randomInvitation.creator.username} sent a match invitation for ${randomInvitation.match.name}`;
        notification.recipient =
          players[Math.floor(Math.random() * players.length)];
        return notification;
      })
      .createMany(100);

    const notifications = await factory(Notification)()
      .map(async (notifications) => {
        notifications.type = 'Message';
        notifications.recipient =
          players[Math.floor(Math.random() * players.length)];
        return notifications;
      })
      .createMany(100);
  }
}
