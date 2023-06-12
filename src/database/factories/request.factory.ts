import { define } from 'typeorm-seeding';
import { Request } from '../../request/entities/request.entity';
import { Match } from '../../match/entities/match.entity';
import { Player } from '../../player/entities/player.entity';
import { Notification } from '../../notification/entities/notification.entity';

define(Request, (faker) => {
  const request = new Request();

  request.isAccepted = faker.random.boolean();
  request.createdAt = faker.date.past();
  request.updatedAt = faker.date.recent();

  return request;
});
