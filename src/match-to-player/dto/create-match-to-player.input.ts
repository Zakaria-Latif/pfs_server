import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateMatchToPlayerInput {
  @Field()
  @IsNumber()
  @IsOptional()
  rate: number = 0;

  @Field()
  @IsString()
  @IsOptional()
  position: string = 'Attack';

  @Field()
  @IsNumber()
  playerId: number;

  @Field()
  @IsNumber()
  matchId: number;
}
