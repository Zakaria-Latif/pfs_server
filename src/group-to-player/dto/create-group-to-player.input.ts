import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class CreateGroupToPlayerInput {
  @Field()
  @IsNumber()
  playerId: number;

  @Field()
  @IsNumber()
  groupId: number;
}
