import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { FacturaDetalleDto } from 'src/modules/detalle-factura/storage/dtos/factura-detalle.dto';
import { FacturaInterface } from './interfaces/factura.interface';

export class FacturaDto implements FacturaInterface {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty({
    message: 'The `clienteNombre` argument must not be empty',
  })
  @IsString({
    message: 'The `clienteNombre` argument must be of type string',
  })
  clienteNombre: string;

  @IsOptional()
  @IsString({
    message: 'The `clienteCorreo` argument must be of type string',
  })
  clienteCorreo: string;

  @IsOptional()
  detalleFactura: FacturaDetalleDto[];
}
