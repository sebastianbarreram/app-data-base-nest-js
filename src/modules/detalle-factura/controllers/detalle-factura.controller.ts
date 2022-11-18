import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { DetalleFacturaService } from '../services/detalle-factura.service';
import { DetalleFacturaEntity } from '../storage/databases/mysql/entities/detalle-factura.entity';
import { ResponseDetalleFacturaInterceptor } from '../interceptors/response-detalle-factura.interceptor';
import { AuthGuardDetalleFactura } from '../guards/auth-detalle-factura.guard';

@Controller('api')
export class DetalleFacturaController {
  constructor(private readonly detalleFacturaService: DetalleFacturaService) {}

  @Get('detallefactura')
  @UseInterceptors(ResponseDetalleFacturaInterceptor)
  getAllDetalleFactura(): Promise<DetalleFacturaEntity[]> {
    return this.detalleFacturaService.getAllDetallesFacturas();
  }

  @Get('detallefactura/:id')
  @UseInterceptors(ResponseDetalleFacturaInterceptor)
  getDetalleFacturaById(
    @Param('id') id: string,
  ): Promise<DetalleFacturaEntity | null> {
    return this.detalleFacturaService.getDetalleFacturaById(id);
  }

  @Delete('detallefactura/:id')
  @UseGuards(AuthGuardDetalleFactura)
  deleteDetalleFactura(@Param('id') id: string): Promise<boolean> {
    return this.detalleFacturaService.deleteDetallefactura(id);
  }

  @Put('detallefactura/:id')
  @UseGuards(AuthGuardDetalleFactura)
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
