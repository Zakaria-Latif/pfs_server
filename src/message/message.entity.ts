import { Field, Int, ObjectType  } from '@nestjs/graphql';
import { GraphQLBoolean } from 'graphql';

@ObjectType()
export class Message {
    @Field(type=>Int)
    id: number
    @Field()
    message: string
    // group       Group
    // groupId    Int
    // sender      Player   @relation(fields: [senderId], references: [id])
    // senderId    Int
    @Field(type=>GraphQLBoolean)
    isRead: boolean      
}
