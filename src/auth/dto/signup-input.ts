import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SignUpInput {
  @Field()
  email: string;
  @Field()
  username: string;
  @Field()
  password: string;
  @Field({ nullable: true })
  image: string;
}
