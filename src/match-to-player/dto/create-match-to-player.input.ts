import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateMatchToPlayerInput {
  @Field()
  @IsNumber()
  rate: number;

  @Field()
  @IsString()
  position: string;

  @Field()
  @IsNumber()
  playerId: number;

  @Field()
  @IsNumber()
  matchId: number;
}
