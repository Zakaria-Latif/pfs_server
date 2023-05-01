import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';
import { PlayerStatistics } from '../../player-statistics/entities/player-statistic.entity';
import { Player } from '../../player/entities/player.entity';

define(Player, (fak: typeof faker) => {
  const player = new Player();
  player.id = faker.datatype.number({ max: 10 });
  player.username = faker.name.firstName();
  player.password = faker.internet.password();
  player.email = faker.internet.email();
  player.location = faker.address.streetAddress();
  player.isVerified = faker.datatype.boolean();
  player.verificationToken = faker.datatype.uuid();
  player.resetToken = faker.datatype.uuid();
  player.resetExpiration = faker.date.future();
  player.description = faker.lorem.sentence();
  player.createdAt = faker.date.past();
  player.updatedAt = faker.date.recent();

  const playerStats = new PlayerStatistics();
  playerStats.id = faker.datatype.number({ min: 1, max: 10 });
  playerStats.rate = faker.datatype.number({ max: 10 });
  playerStats.matchesNumber = faker.datatype.number({ max: 30 });
  playerStats.position = faker.helpers.arrayElement([
    'Goalkeeper',
    'Defender',
    'Midfielder',
    'Attack',
  ]);
  playerStats.createdAt = faker.date.past();
  playerStats.updatedAt = faker.date.recent();
  playerStats.player = player;

  player.playerStatistics = playerStats;
  player.playerStatisticsId = playerStats.id;

  return player;
});
