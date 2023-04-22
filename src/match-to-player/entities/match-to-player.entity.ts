import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Match } from '../../match/entities/match.entity';
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
export class MatchToPlayer {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'float' })
  @Field()
  rate: number;

  @Column()
  @Field()
  position: string;

  @Column()
  @Field((type) => Int)
  playerId: number;

  @ManyToOne(() => Player, (player) => player.matchToPlayers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'playerId' })
  @Field(() => Player)
  player: Player;

  @Column()
  @Field((type) => Int)
  matchId: number;

  @ManyToOne(() => Match, (match) => match.players, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'matchId' })
  @Field(() => Match)
  match: Match;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @Field()
  updatedAt: Date;
}
