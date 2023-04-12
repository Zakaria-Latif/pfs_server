import { Field, Float, Int, ObjectType  } from '@nestjs/graphql';

@ObjectType()
export class MatchToPlayer {
    @Field(type => Int)
    id: number;
    @Field(type => Float)
    rate: number;
    @Field()
    position: string;
    @Field(type => Int)
    playerId: number;
    @Field(type => Int)
    matchId: number;
    @Field(type => Date)
    createdAt: Date;
}
