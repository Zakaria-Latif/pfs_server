import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Player } from '../../player/entities/player.entity';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, Column, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';


@Entity()
@ObjectType()
export class PlayerStatistics {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'float', default: 0 })
  @Field(() => Float, { defaultValue: 0 })
  rate: number;

  @Column({ type: 'int', default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  matchesNumber: number;

  @Column({ type: 'text'})
  @Field(()=>String,  { defaultValue: "Attack" })
  position: string;

  @Column()
  @Field(type=>Int)
  playerId: number;

  @ManyToOne(() => Player, (player) => player.playerStatistics)
  @Field(() => Player)
  player: Player;

  @Field(() => Date)
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field(() => Date)
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}