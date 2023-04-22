import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';

import { Player } from '../../player/entities/player.entity';

define(Player, (fak: typeof faker) => {
  const player = new Player();
  player.username = faker.name.fullName();
  player.password = faker.internet.password();
  player.email = faker.internet.email();
  return player;
});
