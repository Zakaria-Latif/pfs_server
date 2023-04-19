import { ObjectType, Field } from '@nestjs/graphql';
import { Player } from 'src/player/entities/player.entity';

@ObjectType()
export class LoginResponse {
  @Field()
  accessToken: string;

  @Field(()=>Player)
  player: Player;
//   @Field()
//   refreshToken: string;

//   @Field()
//   expiresIn: number;
}
