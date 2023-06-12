import { define } from 'typeorm-seeding';
import { Notification } from '../../notification/entities/notification.entity';
import { Player } from '../../player/entities/player.entity';

define(Notification, (faker) => {
  const notification = new Notification();
  notification.title = faker.lorem.words(3);
  notification.message = faker.lorem.sentence();
  notification.isRead = faker.random.boolean();
  notification.createdAt = faker.date.past();
  notification.updatedAt = faker.date.recent();

  return notification;
});
