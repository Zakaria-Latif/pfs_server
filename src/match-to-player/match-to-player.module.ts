import { Module, forwardRef } from '@nestjs/common';
import { MatchToPlayerService } from './match-to-player.service';
import { MatchToPlayerResolver } from './match-to-player.resolver';
import { MatchToPlayer } from './entities/match-to-player.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerModule } from 'src/player/player.module';
import { MatchModule } from 'src/match/match.module';
import { InvitationModule } from 'src/invitation/invitation.module';
import { RequestModule } from 'src/request/request.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MatchToPlayer]),
    forwardRef(() => MatchModule),
    forwardRef(() => PlayerModule),
    forwardRef(() => RequestModule),
    forwardRef(() => InvitationModule),
  ],
  providers: [MatchToPlayerResolver, MatchToPlayerService],
  exports: [MatchToPlayerService],
})
export class MatchToPlayerModule {}
