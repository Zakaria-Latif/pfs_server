// server/src/Match/movie.input.ts

import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateMatchInput {
	@Field({nullable: false})
	name!: string;
	@Field({nullable: false})
	location!: string;
	@Field()
	time!: Date //timestamp
    @Field(type=>Int)
    playersNumber!: number
    @Field({nullable: false})
    prize!: string //the prize is not always money so it's a String
    @Field(type=>Float)
    duration!: number //In hours for exmp 1.5h
    @Field(type=>Int)
    creatorId!:number
}

@InputType()
export class PaginationInput {
    @Field(type=>Int)
    skip!: number
    @Field(type=>Int)
    take!:number
}


@InputType()
export class FilterMatchInput {
    @Field(type=>Float)
    minDuration!: number
    @Field(type=>Float)
    maxDuration!: number
    @Field(type=>Date)
    from!: Date
    @Field(type=>Date)
    to!: Date
}

@InputType()
export class AddPlayerToMatchInput {
    @Field(type=>Int)
    playerId!:number
    @Field(type=>Int)
    matchId!:number
    @Field(type=>Int)
    creatorId!:number
}


