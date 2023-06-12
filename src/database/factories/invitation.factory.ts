import { define } from 'typeorm-seeding';
import { Invitation } from '../../invitation/entities/invitation.entity';
import { Player } from '../../player/entities/player.entity';
import { Match } from '../../match/entities/match.entity';
import { Notification } from '../../notification/entities/notification.entity';

define(Invitation, (faker) => {
  const invitation = new Invitation();

  invitation.isAccepted = faker.random.boolean();

  return invitation;
});
