import { Test, TestingModule } from '@nestjs/testing';
import { RequestResolver } from './request.resolver';

describe('RequestResolver', () => {
  let resolver: RequestResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestResolver],
    }).compile();

    resolver = module.get<RequestResolver>(RequestResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
