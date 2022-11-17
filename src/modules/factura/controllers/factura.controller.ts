import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FacturaService } from '../services/factura.service';
import { FacturaDto } from '../storage/databases/mysql/entities/dtos/factura.dto';
import { FacturaEntity } from '../storage/databases/mysql/entities/factura.entity';

@Controller('api')
export class FacturaController {
  constructor(private readonly facturaService: FacturaService) {}

  @Post()
  createFactura(@Body() factura: FacturaDto): Promise<FacturaEntity> {
    const newFactura = new FacturaEntity(factura);
    return this.facturaService.create(newFactura);
  }

  @Get('facturas')
  getAllFacturas(): Promise<FacturaEntity[]> {
    return this.facturaService.getAllFacturas();
  }

  @Get('facturas/:id')
  getFacturaById(@Param('id') id: string): Promise<FacturaEntity | null> {
    return this.facturaService.getFacturaById(id);
  }

  @Delete('facturas/:id')
  deleteFactura(@Param('id') id: string): Promise<boolean> {
    return this.facturaService.deleteFactura(id);
  }

  @Put('facturas/:id')
  updatefactura(@Param('id') id: string, @Body() updateFactura: FacturaEntity) {
    return this.facturaService.updateFactura(id, updateFactura);
  }
}
