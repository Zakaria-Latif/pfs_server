import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';

import { Match } from '../../match/entities/match.entity';

define(Match, (fak: typeof faker) => {
  const match = new Match();
  match.location = faker.address.streetAddress();
  match.name = faker.name.fullName();
  match.time = faker.date.future();
  match.playersNumber = faker.datatype.number({ max: 20 });
  match.prize = faker.name.fullName();
  match.duration = faker.datatype.number({ max: 20 });
  match.creatorId = faker.datatype.number(20);
  return match;
});
