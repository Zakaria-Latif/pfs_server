import { faker } from '@faker-js/faker';
import { MatchToPlayer } from '../../match-to-player/entities/match-to-player.entity';
import { define } from 'typeorm-seeding';

define(MatchToPlayer, (fak: typeof faker) => {
  const matchToPlayer = new MatchToPlayer();
  const options = ['Goalkeeper', 'Defender', 'Midfielder', 'Attack'];
  matchToPlayer.rate = faker.datatype.number({ max: 20 });
  matchToPlayer.position = faker.helpers.arrayElement(options);
  return matchToPlayer;
});
