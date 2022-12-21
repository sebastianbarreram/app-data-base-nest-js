import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { FacturaDetalleDto } from '../../../../../../detalle-factura/storage/dtos/factura-detalle.dto';
import { FacturaInterface } from './interfaces/factura.interface';

@InputType()
export class FacturaDto implements FacturaInterface {
  @IsOptional()
  @IsNumber()
  @Field(() => String, { description: 'Id del producto', nullable: true })
  id: number;

  @IsNotEmpty({
    message: 'The `clienteNombre` argument must not be empty',
  })
  @IsString({
    message: 'The `clienteNombre` argument must be of type string',
  })
  @Length(3, 500)
  @Field(() => String, { description: 'Nombre del cliente' })
  clienteNombre: string;

  @IsOptional()
  @IsString({
    message: 'The `clienteCorreo` argument must be of type string',
  })
  @Field(() => String, { description: 'Correo electrónico del cliente' })
  clienteCorreo: string;

  @IsOptional()
  @Field(() => [FacturaDetalleDto], { nullable: true })
  detalleFactura: FacturaDetalleDto[];
}
