import { Test, TestingModule } from '@nestjs/testing';
import { FacturaService } from './factura.service';

describe('FacturaService', () => {
  let service: FacturaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FacturaService],
    }).compile();

    service = module.get<FacturaService>(FacturaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
