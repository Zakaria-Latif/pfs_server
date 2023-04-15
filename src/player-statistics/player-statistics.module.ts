import { Module, forwardRef } from '@nestjs/common';
import { PlayerStatisticsService } from './player-statistics.service';
import { PlayerStatisticsResolver } from './player-statistics.resolver';
import { PlayerStatistics } from './entities/player-statistic.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerModule } from 'src/player/player.module';

@Module({
  imports: [ TypeOrmModule.forFeature([PlayerStatistics]), 
  forwardRef(() => PlayerModule)],
  providers: [PlayerStatisticsResolver, PlayerStatisticsService],
  exports: [ PlayerStatisticsService ]
})
export class PlayerStatisticsModule {}
