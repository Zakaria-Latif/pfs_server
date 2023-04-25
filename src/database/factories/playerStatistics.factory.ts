import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';

import { PlayerStatistics } from '../../player-statistics/entities/player-statistic.entity';

define(PlayerStatistics, (fak: typeof faker) => {
  const PlayerStatistic = new PlayerStatistics();
  PlayerStatistic.rate = faker.datatype.number({ max: 10 });
  PlayerStatistic.matchesNumber = faker.datatype.number({ max: 30 });
  const options = ['Goalkeeper', 'Defender', 'Midfielder', 'Attack'];
  PlayerStatistic.position = faker.helpers.arrayElement(options);
  return PlayerStatistic;
});
