import { EntityRepository, Repository } from 'typeorm';
import { PlayerStatistics } from './entities/player-statistic.entity';

@EntityRepository(PlayerStatistics)
export class PlayerStatisticsRepository extends Repository<PlayerStatistics> {}
