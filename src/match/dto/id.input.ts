import { InputType, Field, Float, Int } from '@nestjs/graphql';

@InputType()
export class IdInput {
  @Field(() => Int)
  id: number;

}