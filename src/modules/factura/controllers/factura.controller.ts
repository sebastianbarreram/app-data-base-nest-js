import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FacturaService } from '../services/factura.service';
import { FacturaDto } from '../storage/databases/mysql/entities/dtos/factura.dto';
import { FacturaEntity } from '../storage/databases/mysql/entities/factura.entity';
import { ResponseFacturaInterceptor } from '../interceptors/response-factura.interceptor';
import { AuthGuardFactura } from '../guards/auth-factura.guard';

@Controller('api')
export class FacturaController {
  constructor(private readonly facturaService: FacturaService) {}

  @Post()
  @UseGuards(AuthGuardFactura)
  createFactura(
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    factura: FacturaDto,
  ): Promise<FacturaEntity> {
    const newFactura = new FacturaEntity(factura);
    return this.facturaService.create(newFactura);
  }

  @Get('facturas')
  @UseInterceptors(ResponseFacturaInterceptor)
  getAllFacturas(): Promise<FacturaEntity[]> {
    return this.facturaService.getAllFacturas();
  }

  @Get('facturas/:id')
  @UseInterceptors(ResponseFacturaInterceptor)
  getFacturaById(@Param('id') id: string): Promise<FacturaEntity | null> {
    return this.facturaService.getFacturaById(id);
  }

  @Delete('facturas/:id')
  @UseGuards(AuthGuardFactura)
  deleteFactura(@Param('id') id: string): Promise<boolean> {
    return this.facturaService.deleteFactura(id);
  }

  @Put('facturas/:id')
  @UseGuards(AuthGuardFactura)
  updatefactura(@Param('id') id: string, @Body() updateFactura: FacturaEntity) {
    return this.facturaService.updateFactura(id, updateFactura);
  }
}
