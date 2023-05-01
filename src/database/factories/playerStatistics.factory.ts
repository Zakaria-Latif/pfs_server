import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';

import { PlayerStatistics } from '../../player-statistics/entities/player-statistic.entity';
import { Player } from '../../player/entities/player.entity';

define(PlayerStatistics, (fak: typeof faker) => {
  const playerStatistics = new PlayerStatistics();
  playerStatistics.id = faker.datatype.number({ min: 1, max: 10 });
  playerStatistics.rate = faker.datatype.number({ min: 0, max: 10 });
  playerStatistics.matchesNumber = faker.datatype.number({ min: 0, max: 30 });
  playerStatistics.position = faker.helpers.arrayElement([
    'Goalkeeper',
    'Defender',
    'Midfielder',
    'Forward',
  ]);
  playerStatistics.player = new Player();
  playerStatistics.player.id = faker.datatype.number({ min: 1, max: 10 });
  playerStatistics.playerId = playerStatistics.player.id;
  return playerStatistics;
});
