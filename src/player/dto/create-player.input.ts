import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class CreatePlayerInput {
  @Field()
  @IsString()
  username: string;

  @Field()
  @IsString()
  password: string;

  @Field()
  @IsString()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @IsString()
  image?: string;

  @Field({ nullable: true })
  @IsString()
  location?: string;

  @Field({ nullable: true })
  @IsString()
  description?: string;
}
