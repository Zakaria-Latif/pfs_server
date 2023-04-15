import { Test, TestingModule } from '@nestjs/testing';
import { PlayerResolver } from './player.resolver';
import { PlayerService } from './player.service';

describe('PlayerResolver', () => {
  let resolver: PlayerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayerResolver, PlayerService],
    }).compile();

    resolver = module.get<PlayerResolver>(PlayerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
