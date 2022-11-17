import { FacturaDetalleDto } from '../../../../../../detalle-factura/storage/dtos/factura-detalle.dto';

export class FacturaDto {
  clienteNombre: string;
  clienteCorreo?: string | null;
  detalleFactura?: FacturaDetalleDto[];
}
