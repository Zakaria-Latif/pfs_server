import { Test, TestingModule } from '@nestjs/testing';
import { MatchToPlayerResolver } from './match-to-player.resolver';
import { MatchToPlayerService } from './match-to-player.service';

describe('MatchToPlayerResolver', () => {
  let resolver: MatchToPlayerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatchToPlayerResolver, MatchToPlayerService],
    }).compile();

    resolver = module.get<MatchToPlayerResolver>(MatchToPlayerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
