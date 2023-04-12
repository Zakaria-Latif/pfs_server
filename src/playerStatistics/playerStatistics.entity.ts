import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class PlayerStatistics {
  @Field(type => Int)
  id: number;

  @Field(type => Float, { defaultValue: 0 })
  rate: number;

  @Field(type => Int, { defaultValue: 0 })
  matchesNumber: number;

  @Field({ nullable: true })
  favoritePosition: string;

  @Field(type => Int)
  playerId: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
