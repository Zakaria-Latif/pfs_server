import { Field, Float, InputType } from "@nestjs/graphql";

@InputType()
export class SearchPlayerInput {
  @Field()
  position: string;

  @Field(() => Float)
  minRate: number;
}