import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Group } from '../../group/entities/group.entity';
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
import { RequestType } from '../dto/request-type.enum';

@Entity()
@ObjectType()
export class Notification {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ default: RequestType.MESSAGE })
  @Field(() => String)
  type: String;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  message: string;

  @Column({ default: false })
  @Field(() => Boolean)
  isRead: boolean;

  @Column()
  @Field((type) => Int)
  recipientId: number;

  @ManyToOne(() => Player)
  @JoinColumn({ name: 'recipientId' })
  @Field(() => Player)
  recipient: Player;

  @Column({ default: () => 'now()' })
  @Field()
  createdAt: Date;

  @Column({ default: () => 'now()' })
  @Field()
  updatedAt: Date;
}
