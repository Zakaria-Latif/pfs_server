import { CreatePlayerStatisticInput } from './create-player-statistic.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePlayerStatisticInput extends PartialType(CreatePlayerStatisticInput) {
  @Field(() => Int)
  id: number;
}
