import { FacturaDetalleDto } from '../../../../../../../detalle-factura/storage/dtos/factura-detalle.dto';

export interface FacturaInterface {
  id: number;
  clienteNombre: string;
  clienteCorreo: string | null;
  detalleFactura: FacturaDetalleDto[];
}
