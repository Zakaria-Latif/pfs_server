import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';
import { RequestType } from './request-type.enum';
import { Player } from 'src/player/entities/player.entity';

@InputType()
export class CreateNotificationInput {
  @Field()
  type: string;

  @Field()
  title: string;

  @Field()
  message: string;

  @Field()
  recipientId: number;

  @Field()
  entityId: number;
}
