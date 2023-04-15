import { Test, TestingModule } from '@nestjs/testing';
import { GroupToPlayerResolver } from './group-to-player.resolver';
import { GroupToPlayerService } from './group-to-player.service';

describe('GroupToPlayerResolver', () => {
  let resolver: GroupToPlayerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupToPlayerResolver, GroupToPlayerService],
    }).compile();

    resolver = module.get<GroupToPlayerResolver>(GroupToPlayerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
