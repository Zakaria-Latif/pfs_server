import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';

import { Player } from '../../player/entities/player.entity';

define(Player, (fak: typeof faker) => {
  const player = new Player();
  player.username = faker.name.firstName();
  player.password = faker.internet.password();
  player.fullName = faker.name.fullName();
  player.location = faker.address.streetAddress();
  player.isVerified = faker.datatype.boolean();
  player.verificationToken = faker.datatype.uuid();
  player.resetToken = faker.datatype.uuid();
  player.resetExpiration = faker.date.future();
  player.description = faker.lorem.sentence();
  player.createdAt = faker.date.past();
  player.updatedAt = faker.date.recent();
  return player;
});
