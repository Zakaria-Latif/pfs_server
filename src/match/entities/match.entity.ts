import { ObjectType, Field, Int, Float, InputType } from '@nestjs/graphql';
import { MatchToPlayer } from '../../match-to-player/entities/match-to-player.entity';
import { Player } from '../../player/entities/player.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  Column,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Match {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String)
  location: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => Date)
  time: Date;

  @Column()
  @Field(() => Int)
  playersNumber: number;

  @Column()
  @Field(() => String)
  prize: string;

  @Column()
  @Field(() => Float)
  duration: number;

  @Column()
  @Field((type) => Int)
  creatorId: number;

  @ManyToOne(() => Player, (player) => player.createdMatches)
  @JoinColumn({ name: 'creatorId' })
  @Field(() => Player)
  creator: Player;

  @OneToMany(() => MatchToPlayer, (matchToPlayer) => matchToPlayer.match)
  @Field(() => [MatchToPlayer])
  players: MatchToPlayer[];

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;
}

@InputType()
export class CreateMatchInput {
  @Field(() => String)
  location: string;

  @Field(() => String)
  name: string;

  @Field(() => Date)
  time: Date;

  @Field(() => Int)
  playersNumber: number;

  @Field(() => String)
  prize: string;

  @Field(() => Float)
  duration: number;

  @Field(() => Int)
  creatorId: number;
}
