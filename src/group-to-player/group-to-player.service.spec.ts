import { Test, TestingModule } from '@nestjs/testing';
import { GroupToPlayerService } from './group-to-player.service';

describe('GroupToPlayerService', () => {
  let service: GroupToPlayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupToPlayerService],
    }).compile();

    service = module.get<GroupToPlayerService>(GroupToPlayerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
