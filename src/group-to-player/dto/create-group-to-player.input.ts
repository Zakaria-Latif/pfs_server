import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateGroupToPlayerInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
