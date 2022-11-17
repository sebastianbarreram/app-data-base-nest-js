import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { DetalleFacturaService } from '../services/detalle-factura.service';
import { DetalleFacturaEntity } from '../storage/databases/mysql/entities/detalle-factura.entity';

@Controller('api')
export class DetalleFacturaController {
  constructor(private readonly detalleFacturaService: DetalleFacturaService) {}

  @Get('detallefactura')
  getAllDetalleFactura(): Promise<DetalleFacturaEntity[]> {
    return this.detalleFacturaService.getAllDetallesFacturas();
  }

  @Get('detallefactura/:id')
  getDetalleFacturaById(
    @Param('id') id: string,
  ): Promise<DetalleFacturaEntity | null> {
    return this.detalleFacturaService.getDetalleFacturaById(id);
  }

  @Delete('detallefactura/:id')
  deleteDetalleFactura(@Param('id') id: string): Promise<boolean> {
    return this.detalleFacturaService.deleteDetallefactura(id);
  }

  @Put('detallefactura/:id')
  updateDetallefactura(
    @Param('id') id: string,
    @Body() updateDetalleFactura: DetalleFacturaEntity,
  ) {
    return this.detalleFacturaService.updateDetalleFactura(
      id,
      updateDetalleFactura,
    );
  }
}
