import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GroupToPlayer } from '../../group-to-player/entities/group-to-player.entity';
import { MatchToPlayer } from '../../match-to-player/entities/match-to-player.entity';
import { Match } from '../../match/entities/match.entity';
import { Message } from '../../message/entities/message.entity';
import { PlayerStatistics } from '../../player-statistics/entities/player-statistic.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  Column,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { Group } from '../../group/entities/group.entity';
import { Notification } from '../../notification/entities/notification.entity';
import { Request } from '../../request/entities/request.entity';
import { Invitation } from '../../invitation/entities/invitation.entity';
import { Calendar } from '../../calendar/entities/calendar.entity';

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
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  location?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  image: string;

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

  @Column({ nullable: true })
  @Field((type) => Int)
  playerStatisticsId?: number;

  @OneToOne(
    () => PlayerStatistics,
    (playerStatistics) => playerStatistics.player,
    {
      nullable: true,
      cascade: true,
    },
  )
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

  @OneToMany(() => Group, (group) => group.creator)
  @JoinColumn()
  @Field(() => [Group])
  createdGroups: Group[];

  @OneToMany(() => MatchToPlayer, (matchToPlayer) => matchToPlayer.player)
  @JoinColumn()
  @Field(() => [MatchToPlayer])
  matchToPlayers: MatchToPlayer[];

  @OneToMany(() => Message, (message) => message.sender)
  @JoinColumn()
  @Field(() => [Message])
  messages: Message[];

  @OneToMany(() => Notification, (notification) => notification.recipient)
  @Field(() => [Notification])
  notifications: Notification[];

  @OneToMany(() => Request, (request) => request.creator)
  @Field(() => [Request])
  requests: Request[];

  @OneToMany(() => Invitation, (invitation) => invitation.recipient)
  @Field(() => [Invitation])
  invitations: Invitation[];

  @OneToOne(() => Calendar)
  @Field(() => Calendar)
  calendar: Calendar;

  @Column({ default: () => 'now()' })
  @Field()
  createdAt: Date;

  @Column({ default: () => 'now()' })
  @Field()
  updatedAt: Date;
}
