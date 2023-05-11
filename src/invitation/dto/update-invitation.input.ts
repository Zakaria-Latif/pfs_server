import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateInvitationInput } from './create-invitation.input';

@InputType()
export class UpdateInvitationInput extends PartialType(CreateInvitationInput) {
  @Field(() => Int)
  id: number;
}
