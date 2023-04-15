import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Group } from 'src/group/entities/group.entity';
import { Player } from 'src/player/entities/player.entity';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, Column, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Message {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'The ID of the message' })
  id: number;

  @Column()
  @Field(() => String, { description: 'The content of the message' })
  message: string;

  @Column()
  @Field(type=>Int)
  groupId: number;

  @ManyToOne(() => Group, { onDelete: 'CASCADE' })
  @JoinColumn()
  @Field(() => Group, { description: 'The group that the message belongs to' })
  group: Group;

  @Column()
  @Field(type=>Int)
  senderId: number;

  @ManyToOne(() => Player, { onDelete: 'CASCADE' })
  @JoinColumn()
  @Field(() => Player, { description: 'The player that sent the message' })
  sender: Player;

  @Column({ default: false })
  @Field(() => Boolean, { description: 'Whether the message has been read' })
  isRead: boolean;

  @CreateDateColumn()
  @Field(() => Date, { description: 'The timestamp when the message was created' })
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date, { description: 'The timestamp when the message was last updated' })
  updatedAt: Date;
}