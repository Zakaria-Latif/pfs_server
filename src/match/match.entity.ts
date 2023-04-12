import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { MatchToPlayer } from 'src/matchToPlayer/matchToPlayer.entity';
import { Player } from 'src/player/player.entity';

@ObjectType()
export class Match {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  location: string;

  @Field(() => String)
  name: string;

  @Field(() => Date)
  time: Date;

  @Field(() => Int)
  playersNumber: number;

  @Field(() => String)
  prize: string;

  @Field(() => Float)
  duration: number;

  @Field(() => Player)
  creator: Player;

  @Field(() => [MatchToPlayer])
  players: MatchToPlayer[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
