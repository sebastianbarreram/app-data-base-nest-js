import { FacturaDetalleDto } from './factura-detalle.dto';

export class FacturaDto {
  clienteNombre: string;
  clienteCorreo?: string;
  detalleFactura?: FacturaDetalleDto[];
}
