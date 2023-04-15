import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class PaginationGroupInput {
  @Field(() => Int, { description: 'Skip' })
  skip: number;
  @Field(() => Int, { description: 'Take' })
  take: number;
}
