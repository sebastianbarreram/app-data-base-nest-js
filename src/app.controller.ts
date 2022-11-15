import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FacturaDto } from './dto/factura.dto';
import { DetalleFacturaEntity } from './entities/detalle-factura.entity';
import { FacturaEntity } from './entities/factura.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  createFactura(@Body() factura: FacturaDto): Promise<FacturaEntity> {
    const newFactura = new FacturaEntity(factura);
    return this.appService.create(newFactura);
  }

  @Get('facturas')
  getAllFacturas(): Promise<FacturaEntity[]> {
    return this.appService.getAllFacturas();
  }

  @Get('detallefactura')
  getAllDetalleFactura(): Promise<DetalleFacturaEntity[]> {
    return this.appService.getAllDetallesFacturas();
  }

  @Get('facturas/:id')
  getFacturaById(@Param('id') id: string): Promise<FacturaEntity | null> {
    return this.appService.getFacturaById(id);
  }

  @Get('detallefactura/:id')
  getDetalleFacturaById(
    @Param('id') id: string,
  ): Promise<DetalleFacturaEntity | null> {
    return this.appService.getDetalleFacturaById(id);
  }

  @Delete('facturas/:id')
  deleteFactura(@Param('id') id: string): Promise<boolean> {
    return this.appService.deleteFactura(id);
  }

  @Delete('detallefactura/:id')
  deleteDetalleFactura(@Param('id') id: string): Promise<boolean> {
    return this.appService.deleteDetallefactura(id);
  }

  @Put('detallefactura/:id')
  updateDetallefactura(
    @Param('id') id: string,
    @Body() updateDetalleFactura: DetalleFacturaEntity,
  ) {
    return this.appService.updateDetalleFactura(id, updateDetalleFactura);
  }

  @Put('facturas/:id')
  updatefactura(@Param('id') id: string, @Body() updateFactura: FacturaEntity) {
    return this.appService.updateFactura(id, updateFactura);
  }
}
