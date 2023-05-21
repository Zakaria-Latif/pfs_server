import { InputType, Field, Float, Int } from '@nestjs/graphql';

@InputType()
export class CreateMatchInput {
  @Field()
  location: string;

  @Field()
  name: string;

  @Field()
  time: string;

  @Field(() => Int)
  playersNumber: number;

  @Field()
  prize: string;

  @Field(() => Float)
  duration: number;
}
