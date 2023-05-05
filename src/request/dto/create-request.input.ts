import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class CreateRequestInput {
  @Field(() => Int)
  @IsNumber()
  matchId: number;

  @Field(() => Int)
  @IsNumber()
  creatorId: number;
}
