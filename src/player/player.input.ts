import { Field, Float, InputType, Int } from '@nestjs/graphql';

//we 'll add email later
@InputType()
export class CreatePlayerInput {
    @Field()
    username: string
    @Field()
    password: string
    @Field()
    fullName: string
}