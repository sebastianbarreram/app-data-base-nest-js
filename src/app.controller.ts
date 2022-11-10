import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { FacturaDto } from './dto/factura.dto';
import { FacturaEntity } from './entities/factura.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  createFactura(@Body() factura: FacturaDto): Promise<FacturaEntity> {
    const newFactura = new FacturaEntity(factura);
    return this.appService.create(newFactura);
  }
}
