import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class CreatePlayerInput {
  @Field()
  @IsString()
  @IsEmail()
  username: string;

  @Field()
  @IsString()
  password: string;

  @Field()
  @IsString()
  fullName: string;

  @Field({ nullable: true })
  @IsString()
  location?: string;

  @Field({ nullable: true })
  @IsString()
  description?: string;
}
