import { FacturaDto } from '../../../factura/storage/databases/mysql/entities/dtos/factura.dto';
export class FacturaDetalleDto {
  producto: string;
  cantidad: number;
  precio: number;
  total: number;
  factura: FacturaDto;
}
