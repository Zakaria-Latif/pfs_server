import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Match } from '../../match/entities/match.entity';
import { Player } from '../../player/entities/player.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity()
@ObjectType()
export class Request {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field((type) => Int)
  matchId: number;

  @ManyToOne(() => Match)
  @JoinColumn({ name: 'matchId' })
  @Field(() => Match)
  match: Match;

  @Column()
  @Field((type) => Int)
  creatorId: number;

  @ManyToOne(() => Player)
  @JoinColumn({ name: 'creatorId' })
  @Field(() => Player)
  creator: Player;

  @Column({ default: false })
  @Field(() => Boolean)
  isAccepted: boolean;

  @Column({ default: () => 'now()' })
  @Field()
  createdAt: Date;

  @Column({ default: () => 'now()' })
  @Field()
  updatedAt: Date;
}
