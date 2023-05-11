import { Module, forwardRef } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchResolver } from './match.resolver';
import { Match } from './entities/match.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerModule } from 'src/player/player.module';
import { InvitationModule } from 'src/invitation/invitation.module';
import { RequestModule } from 'src/request/request.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Match]),
    forwardRef(() => PlayerModule),
    forwardRef(() => RequestModule),
    forwardRef(() => InvitationModule),
  ],
  providers: [MatchResolver, MatchService],
  exports: [MatchService],
})
export class MatchModule {}
