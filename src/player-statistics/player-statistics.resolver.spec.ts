import { Test, TestingModule } from '@nestjs/testing';
import { PlayerStatisticsResolver } from './player-statistics.resolver';
import { PlayerStatisticsService } from './player-statistics.service';

describe('PlayerStatisticsResolver', () => {
  let resolver: PlayerStatisticsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayerStatisticsResolver, PlayerStatisticsService],
    }).compile();

    resolver = module.get<PlayerStatisticsResolver>(PlayerStatisticsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
