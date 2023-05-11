import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Match } from '../../match/entities/match.entity';
import { Player } from '../../player/entities/player.entity';
import { PlayerStatistics } from '../../player-statistics/entities/player-statistic.entity';
import { MatchToPlayer } from '../../match-to-player/entities/match-to-player.entity';
import { Group } from '../../group/entities/group.entity';
import { GroupToPlayer } from '../../group-to-player/entities/group-to-player.entity';
import { Message } from '../../message/entities/message.entity';

export default class InitialDatabaseSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    //Generate Unique Value
    const usedNumbers = [];

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
      .createMany(50);
  }
}
