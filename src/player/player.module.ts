import { Module, forwardRef } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerResolver } from './player.resolver';
import { Player } from './entities/player.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerStatisticsModule } from 'src/player-statistics/player-statistics.module';
import { GroupToPlayerModule } from 'src/group-to-player/group-to-player.module';
import { MatchModule } from 'src/match/match.module';
import { MatchToPlayerModule } from 'src/match-to-player/match-to-player.module';
import { MessageModule } from 'src/message/message.module';
import { PlayerStatisticsRepository } from 'src/player-statistics/player-statistics.repository';
import { PlayerStatisticsService } from 'src/player-statistics/player-statistics.service';
import { NotificationModule } from 'src/notification/notification.module';
import { RequestModule } from 'src/request/request.module';
import { InvitationModule } from 'src/invitation/invitation.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Player]),
    TypeOrmModule.forFeature([PlayerStatisticsModule]),
    PlayerStatisticsModule,
    GroupToPlayerModule,
    forwardRef(() => MatchModule),
    MatchToPlayerModule,
    MessageModule,
    NotificationModule,
    forwardRef(() => RequestModule),
    forwardRef(() => InvitationModule),
  ],
  providers: [
    PlayerResolver,
    PlayerService,
    PlayerStatisticsRepository,
    PlayerStatisticsService,
  ],
  exports: [PlayerService],
})
export class PlayerModule {}
