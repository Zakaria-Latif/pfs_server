import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SignUpInput {
  @Field()
  fullName: string;
  @Field()
  username: string;

  @Field()
  password: string;
}
