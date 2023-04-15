import { Test, TestingModule } from '@nestjs/testing';
import { MatchToPlayerService } from './match-to-player.service';

describe('MatchToPlayerService', () => {
  let service: MatchToPlayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatchToPlayerService],
    }).compile();

    service = module.get<MatchToPlayerService>(MatchToPlayerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
