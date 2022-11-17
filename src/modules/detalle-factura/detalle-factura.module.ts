import { Module } from '@nestjs/common';
import { DetalleFacturaController } from './controllers/detalle-factura.controller';
import { DetalleFacturaService } from './services/detalle-factura.service';

@Module({
  controllers: [DetalleFacturaController],
  providers: [DetalleFacturaService],
})
export class DetalleFacturaModule {}
