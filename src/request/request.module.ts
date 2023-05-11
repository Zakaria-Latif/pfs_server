import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from './entities/request.entity';
import { RequestService } from './request.service';
import { RequestResolver } from './request.resolver';
import { MatchModule } from 'src/match/match.module';
import { PlayerModule } from 'src/player/player.module';
import { MatchToPlayerModule } from 'src/match-to-player/match-to-player.module';
import { NotificationModule } from 'src/notification/notification.module';
import { InvitationService } from 'src/invitation/invitation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Request]),
    forwardRef(() => MatchModule),
    forwardRef(() => PlayerModule),
    forwardRef(() => MatchToPlayerModule),
    forwardRef(() => NotificationModule),
  ],
  providers: [RequestService, RequestResolver],
  exports: [RequestService],
})
export class RequestModule {}
