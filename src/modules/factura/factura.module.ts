import { Module } from '@nestjs/common';
import { FacturaController } from './controllers/factura.controller';
import { FacturaService } from './services/factura.service';

@Module({
  controllers: [FacturaController],
  providers: [FacturaService],
})
export class FacturaModule {}
