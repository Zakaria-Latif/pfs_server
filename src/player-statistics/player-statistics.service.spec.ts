import { Test, TestingModule } from '@nestjs/testing';
import { PlayerStatisticsService } from './player-statistics.service';

describe('PlayerStatisticsService', () => {
  let service: PlayerStatisticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayerStatisticsService],
    }).compile();

    service = module.get<PlayerStatisticsService>(PlayerStatisticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
