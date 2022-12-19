import { Test, TestingModule } from '@nestjs/testing';
import { HelloWorldResolver } from './hello-world.resolver';

describe('HelloWorldResolver', () => {
  let resolver: HelloWorldResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelloWorldResolver],
    }).compile();

    resolver = module.get<HelloWorldResolver>(HelloWorldResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
