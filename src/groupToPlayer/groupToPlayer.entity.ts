import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Group } from 'src/group/group.entity';
import { Player } from 'src/player/player.entity';

@ObjectType()
export class GroupToPlayer {
  @Field((type) => Int)
  id: number;

  @Field((type) => Player)
  player: Player;

  @Field((type) => Int)
  playerId: number;

  @Field((type) => Group)
  group: Group;

  @Field((type) => Int)
  groupId: number;

  @Field()
  createdAt: Date;

//   constructor(partial: Partial<GroupToPlayer>) {
//     Object.assign(this, partial);
//   }
}
