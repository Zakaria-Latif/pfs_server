import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsString } from 'class-validator';

@InputType()
export class CreateMessageInput {
  @Field()
  @IsString()
  message: string;

  @Field()
  @IsInt()
  groupId: number;

  @Field()
  @IsInt()
  senderId: number;

  @Field({ nullable: true })
  @IsBoolean()
  isRead?: boolean;
}
