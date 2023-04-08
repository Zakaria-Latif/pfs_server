// server/src/movie/movie.model.ts

import { Field, Float, Int, ObjectType  } from '@nestjs/graphql';

@ObjectType()
export class Match {
    @Field(type=>Int)
    id: number;
    @Field()
    location: string
    @Field()
    time: Date //timestamp
    @Field(type=>Int)
    playersNumber: number
    @Field()
    prize: string //the prize is not always money so it's a String
    @Field(type=>Float)
    duration: number //In hours for exmp 1.5h
    // creator: Player
    // creatorId:number
    // players: MatchToPlayer[]
}