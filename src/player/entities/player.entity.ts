import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GroupToPlayer } from 'src/group-to-player/entities/group-to-player.entity';
import { MatchToPlayer } from 'src/match-to-player/entities/match-to-player.entity';
import { Match } from 'src/match/entities/match.entity';
import { Message } from 'src/message/entities/message.entity';
import { PlayerStatistics } from 'src/player-statistics/entities/player-statistic.entity';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, Column, UpdateDateColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';

@Entity()
@ObjectType()
export class Player {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  username: string;

  @Column()
  @Field()
  password: string;

  @Column()
  @Field()
  fullName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  location?: string;

  @Column({ default: false })
  @Field()
  isVerified: boolean;

  @Column({ nullable: true })
  @Field({ nullable: true })
  verificationToken?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  resetToken?: string;

  @Column({ default: () => 'now()' })
  @Field()
  resetExpiration: Date;

  @Column({ default: '' })
  @Field()
  description: string;

  @Column()
  @Field(type=>Int)
  playerStatisticsId: number;

  @OneToOne(() => PlayerStatistics, (playerStatistics) => playerStatistics.player, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn()
  @Field(() => PlayerStatistics, { nullable: true })
  playerStatistics?: PlayerStatistics;

  @OneToMany(() => GroupToPlayer, (groupToPlayer) => groupToPlayer.player)
  @JoinColumn()
  @Field(() => [GroupToPlayer])
  groups: GroupToPlayer[];

  @OneToMany(() => Match, (match) => match.creator)
  @JoinColumn()
  @Field(() => [Match])
  createdMatches: Match[];

  @OneToMany(() => MatchToPlayer, (matchToPlayer) => matchToPlayer.player)
  @JoinColumn()
  @Field(() => [MatchToPlayer])
  matchToPlayers: MatchToPlayer[];

  @OneToMany(() => Message, (message) => message.sender)
  @JoinColumn()
  @Field(() => [Message])
  messages: Message[];

  @Column({ default: () => 'now()' })
  @Field()
  createdAt: Date;

  @Column({ default: () => 'now()' })
  @Field()
  updatedAt: Date;
}