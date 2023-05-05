import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateRequestInput } from './create-request.input';

@InputType()
export class UpdateRequestInput extends PartialType(CreateRequestInput) {
  @Field(() => Int)
  id: number;
}
