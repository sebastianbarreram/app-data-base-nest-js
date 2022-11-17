import { Test, TestingModule } from '@nestjs/testing';
import { DetalleFacturaService } from './detalle-factura.service';

describe('DetalleFacturaService', () => {
  let service: DetalleFacturaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetalleFacturaService],
    }).compile();

    service = module.get<DetalleFacturaService>(DetalleFacturaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
