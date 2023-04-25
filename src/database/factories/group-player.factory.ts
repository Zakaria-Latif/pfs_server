import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';

import { Player } from '../../player/entities/player.entity';
import { GroupToPlayer } from '../../group-to-player/entities/group-to-player.entity';

define(GroupToPlayer, (fak: typeof faker) => {
  const groupToPlayer = new GroupToPlayer();
  return groupToPlayer;
});
