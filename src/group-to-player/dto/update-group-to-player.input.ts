import { CreateGroupToPlayerInput } from './create-group-to-player.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGroupToPlayerInput extends PartialType(CreateGroupToPlayerInput) {
  @Field(() => Int)
  id: number;
}
