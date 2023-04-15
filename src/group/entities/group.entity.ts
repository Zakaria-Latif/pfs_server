import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GroupToPlayer } from 'src/group-to-player/entities/group-to-player.entity';
import { Message } from 'src/message/entities/message.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity()
@ObjectType()
export class Group {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @OneToMany(() => GroupToPlayer, groupToPlayer => groupToPlayer.group)
  @Field(() => [GroupToPlayer])
  players: GroupToPlayer[];

  @OneToMany(() => Message, message => message.group)
  @Field(() => [Message])
  messages: Message[];

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
export class GroupResponse {
  @Field(() => Group, { nullable: true })
  group?: Group;

  @Field(() => String, { nullable: true })
  message?: string;
}