import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invitation } from './entities/invitation.entity';
import { InvitationService } from './invitation.service';
import { InvitationResolver } from './invitation.resolver';
import { MatchModule } from '../match/match.module';
import { PlayerModule } from '../player/player.module';
import { NotificationModule } from '../notification/notification.module';
import { MatchToPlayerModule } from 'src/match-to-player/match-to-player.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Invitation]),
    forwardRef(() => MatchModule),
    forwardRef(() => PlayerModule),
    forwardRef(() => MatchToPlayerModule),
    forwardRef(() => NotificationModule),
  ],
  providers: [InvitationService, InvitationResolver],
  exports: [InvitationService],
})
export class InvitationModule {}
