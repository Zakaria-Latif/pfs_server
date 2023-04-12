import { Field, Float, Int, ObjectType  } from '@nestjs/graphql';
import { Group } from 'src/group/group.entity';
import { Player } from 'src/player/player.entity';

@ObjectType()
export class Message {
    @Field(type => Int)
    id: number;
    @Field()
    message: string;
    @Field(type => Int)
    groupId: number;
    @Field(()=>Group)
    group: Group;
    @Field(type => Int)
    senderId: number;
    @Field(()=>Player)
    sender: Player;
    @Field()
    isRead: boolean;
    @Field()
    createdAt: Date;
    @Field()
    updatedAt: Date;
}
