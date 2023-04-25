import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Group } from '../../group/entities/group.entity';
import { Player } from '../../player/entities/player.entity';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Column } from 'typeorm';

@Entity()
@ObjectType()
export class GroupToPlayer {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'The ID of the GroupToPlayer' })
  id: number;

  @Column()
  @Field(type=>Int)
  playerId: number;

  @ManyToOne(() => Player, { cascade: true })
  @JoinColumn()
  @Field(() => Player, { description: 'The player of the GroupToPlayer' })
  player: Player;

  @Column()
  @Field(type=>Int)
  groupId: number;

  @ManyToOne(() => Group, { cascade: true })
  @JoinColumn()
  @Field(() => Group, { description: 'The group of the GroupToPlayer' })
  group: Group;

  @CreateDateColumn()
  @Field(() => Date, { description: 'The timestamp representing when the GroupToPlayer was created' })
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date, { description: 'The timestamp representing when the GroupToPlayer was last updated' })
  updatedAt: Date;
}