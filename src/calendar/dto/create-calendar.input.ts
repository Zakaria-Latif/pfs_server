import { InputType, Field } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class CreateCalendarInput {
  @Field()
  @IsInt()
  playerId: number;
}
