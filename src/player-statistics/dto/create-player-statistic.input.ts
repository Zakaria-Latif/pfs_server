import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@InputType()
export class CreatePlayerStatisticInput {
  @Field()
  @IsInt()
  rate: number;

  @Field()
  @IsInt()
  matchesNumber: number;

  @Field()
  @IsString()
  position: string;

  @Field({ nullable: true })
  @IsString()
  location?: string;

  @Field({ nullable: true })
  @IsString()
  description?: string;
}
