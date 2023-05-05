import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GroupToPlayer } from '../../group-to-player/entities/group-to-player.entity';
import { Message } from '../../message/entities/message.entity';
import { Notification } from '../../notification/entities/notification.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Player } from '../../player/entities/player.entity';

@Entity()
@ObjectType()
export class Group {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field((type) => Int)
  creatorId: number;

  @ManyToOne(() => Player, (player) => player.createdGroups)
  @JoinColumn({ name: 'creatorId' })
  @Field(() => Player)
  creator: Player;

  @OneToMany(() => GroupToPlayer, (groupToPlayer) => groupToPlayer.group)
  @Field(() => [GroupToPlayer])
  players: GroupToPlayer[];

  @OneToMany(() => Message, (message) => message.group)
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
