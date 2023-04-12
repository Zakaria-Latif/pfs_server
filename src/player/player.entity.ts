import { Field, Float, Int, ObjectType  } from '@nestjs/graphql';
import { GroupToPlayer } from 'src/groupToPlayer/groupToPlayer.entity';
import { Match } from 'src/match/match.entity';
import { MatchToPlayer } from 'src/matchToPlayer/matchToPlayer.entity';
import { Message } from 'src/message/message.entity';
import { PlayerStatistics } from 'src/playerStatistics/playerStatistics.entity';

@ObjectType()
export class Player {
    @Field(type=>Int)
    id: number;
    @Field()
    username: string;
    @Field()
    password: string;
    @Field()
    fullName: string;
    @Field()
    location: string;
    @Field()
    isVerified: boolean;
    @Field()
    verificationToken: string;
    @Field()
    resetToken: string;
    @Field(type=>Date)
    resetExpiration: Date;
    @Field({nullable:true})
    description?: string;
    @Field(type=>PlayerStatistics,{nullable:true})
    playerStatistics?: PlayerStatistics;
    @Field(type=>Int)
    playerStatisticsId: number;
    @Field(type=>[GroupToPlayer])
    groups: GroupToPlayer[];
    @Field(type=>[Match])
    createdMatches: Match[];
    @Field(type=>[MatchToPlayer])
    matchToPlayers: MatchToPlayer[];
    @Field(type=>[Message])
    messages: Message[];
    @Field(type=>Date)
    createdAt: Date;
    @Field(type=>Date)
    updatedAt: Date;
}