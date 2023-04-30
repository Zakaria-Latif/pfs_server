import { faker } from '@faker-js/faker';
import { Group } from '../../group/entities/group.entity';
import { define } from 'typeorm-seeding';

define(Group, (fak: typeof faker) => {
  const group = new Group();
  group.name = faker.name.fullName();
  group.creatorId=faker.datatype.number({min: 1, max: 10});
  
  return group;
});
