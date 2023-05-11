import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Player } from '../../player/entities/player.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity()
@ObjectType()
export class Calendar {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'The ID of the Calendar' })
  id: number;

  @Column()
  @Field((type) => Int)
  playerId: number;

  @OneToOne(() => Player)
  @JoinColumn({ name: 'playerId' })
  @Field(() => Player)
  player: Player;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;
}
