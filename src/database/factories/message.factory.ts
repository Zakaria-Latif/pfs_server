import { faker } from '@faker-js/faker';
import { Message } from '../../message/entities/message.entity';
import { define } from 'typeorm-seeding';

define(Message, (fak: typeof faker) => {
  const message = new Message();
  message.message = faker.lorem.sentence(5);
  const options = [true, false];
  message.isRead = faker.helpers.arrayElement(options);
  return message;
});
