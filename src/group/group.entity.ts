import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GroupToPlayer } from 'src/groupToPlayer/groupToPlayer.entity';
import { Message } from 'src/message/message.entity';

@ObjectType()
export class Group {
  @Field(type => Int)
  id: number;

  @Field()
  name: string;

  @Field(type => [GroupToPlayer])
  players: GroupToPlayer[];

  @Field(type => [Message])
  messages: Message[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
