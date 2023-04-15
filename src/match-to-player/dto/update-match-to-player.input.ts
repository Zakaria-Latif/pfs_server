import { CreateMatchToPlayerInput } from './create-match-to-player.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMatchToPlayerInput extends PartialType(CreateMatchToPlayerInput) {
  @Field(() => Int)
  id: number;
}
