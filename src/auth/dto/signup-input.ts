import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SignInput {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
